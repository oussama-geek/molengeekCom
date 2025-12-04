// src/lib/server/forum.ts
import { cookies } from "next/headers";

const API_BASE = (
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.API_BASE_URL ??
    "http://localhost:8000"
).replace(/\/+$/, "");

type ForumReactionBreakdown = {
    type: string;
    emoji: string;
    count: number;
};

type ForumPost = {
    id: number;
    author_name: string;
    created_at: string;
    content_html: string;
    images?: string[];
    likes_count: number;
    comments_count: number;
    bookmarked: boolean;
    is_bookmarked: boolean;
    user_has_bookmarked: boolean;
    reactions_breakdown?: ForumReactionBreakdown[];
    user_reaction?: string | null;
};

type ForumComment = {
    id: number | string;
    post_id?: number | string;
    parent_id?: number | string | null;
    author_name?: string;
    author_avatar_url?: string | null;
    author_initials?: string | null;
    author_is_admin?: boolean;
    created_at?: string;
    content?: string;
    replies?: ForumComment[];
    replies_count?: number;
    user_id?: number | string;
    reactions_breakdown?: ForumReactionBreakdown[];
    user_reaction?: string | null;
    liked?: boolean;
    likes_count?: number;
};

function buildSsrHeaders() {
    return cookies().then(jar => {
        const all = jar.getAll();
        const cookieHeader = all.map(c => `${c.name}=${c.value}`).join("; ");
        const xsrfCookie = all.find(c => c.name === "XSRF-TOKEN");
        const xsrfHeader = xsrfCookie ? decodeURIComponent(xsrfCookie.value) : "";
        return {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...(xsrfHeader ? { "X-XSRF-TOKEN": xsrfHeader } : {}),
            ...(cookieHeader ? { Cookie: cookieHeader } : {}),
            Origin: "http://localhost:3000",
            Referer: "http://localhost:3000/",
        } as Record<string, string>;
    });
}

export async function ssrListForumPosts(): Promise<ForumPost[]> {
    const headers = await buildSsrHeaders();
    const res = await fetch(`${API_BASE}/api/forum/posts`, {
        method: "GET",
        headers,
        cache: "no-store",
    });
    if (!res.ok) {
        const body = await res.text().catch(() => "");
        // console.error("[forum] list posts failed", res.status, body);
        throw new Error(`Forum posts fetch failed: ${res.status}`);
    }
    const json = await res.json().catch(() => null);
    const list = Array.isArray(json) ? json : Array.isArray(json?.data) ? json.data : [];
    return list as ForumPost[];
}

export async function ssrGetForumPost(id: string | number): Promise<ForumPost & { comments: ForumComment[] }> {
    const headers = await buildSsrHeaders();
    const res = await fetch(`${API_BASE}/api/forum/posts/${id}`, {
        method: "GET",
        headers,
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Post introuvable");
    const json = await res.json().catch(() => null);
    const obj = json && typeof json === "object" && !Array.isArray(json) ? (json.data ?? json) : {};
    // normalisation commentaires
    const comments = Array.isArray(obj.comments) ? obj.comments : Array.isArray(json?.comments) ? json.comments : [];
    return { ...(obj as any), comments } as ForumPost & { comments: ForumComment[] };
}

export async function ssrLikePost(
    id: string | number,
    body?: { reaction?: string }
): Promise<{
    ok: boolean;
    liked?: boolean;
    likes_count?: number;
    reaction?: string | null;
    reactions_breakdown?: ForumReactionBreakdown[];
}> {
    const headers = await buildSsrHeaders();
    const res = await fetch(`${API_BASE}/api/forum/posts/${id}/like`, {
        method: "POST",
        headers: body ? { ...headers, "Content-Type": "application/json" } : headers,
        body: body ? JSON.stringify(body) : undefined,
        cache: "no-store",
    });
    let payload: any = null;
    try { payload = await res.json(); } catch { payload = null; }
    return {
        ok: res.ok,
        liked: payload?.liked,
        likes_count: typeof payload?.likes_count === 'number' ? payload.likes_count : undefined,
        reaction: typeof payload?.reaction === "string" ? payload.reaction : payload?.reaction ?? null,
        reactions_breakdown: Array.isArray(payload?.reactions_breakdown) ? payload.reactions_breakdown : undefined,
    };
}

export async function ssrBookmarkPost(id: string | number): Promise<{ ok: boolean; bookmarked?: boolean }> {
    const headers = await buildSsrHeaders();
    const res = await fetch(`${API_BASE}/api/forum/posts/${id}/bookmark`, {
        method: "POST",
        headers,
        cache: "no-store",
    });
    let payload: any = null;
    try { payload = await res.json(); } catch { payload = null; }
    return {
        ok: res.ok,
        bookmarked: payload?.bookmarked === true || payload?.bookmarked === 1 || payload?.bookmarked === '1' ||
            (payload?.is_bookmarked != null && Number(payload.is_bookmarked) === 1) ||
            (payload?.user_has_bookmarked != null && Number(payload.user_has_bookmarked) === 1),
    };
}

export async function ssrCreateComment(id: string | number, body: { content: string }): Promise<{ ok: boolean; comment?: ForumComment; comments_count?: number }> {
    const headers = await buildSsrHeaders();
    const res = await fetch(`${API_BASE}/api/forum/posts/${id}/comments`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
    });
    let payload: any = null;
    try { payload = await res.json(); } catch { }
    return {
        ok: res.ok,
        comment: payload?.comment,
        comments_count: typeof payload?.comments_count === "number" ? payload.comments_count : undefined,
    };
}

export async function ssrDeleteComment(commentId: string | number): Promise<{ ok: boolean }> {
    const headers = await buildSsrHeaders();
    const res = await fetch(`${API_BASE}/api/forum/comments/${commentId}`, {
        method: "DELETE",
        headers,
        cache: "no-store",
    });
    return { ok: res.ok };
}

export async function ssrUpdateComment(commentId: string | number, body: { content: string }): Promise<{ ok: boolean; comment?: any }> {
    const headers = await buildSsrHeaders();
    const res = await fetch(`${API_BASE}/api/forum/comments/${commentId}`, {
        method: "PATCH",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
    });
    let payload: any = undefined;
    try { payload = await res.json(); } catch { }
    return { ok: res.ok, comment: payload?.comment ?? payload };
}

export async function ssrReplyToComment(commentId: string | number, body: { content: string }): Promise<{ ok: boolean; reply?: ForumComment; comments_count?: number; parent_comment_id?: number | string }> {
    const headers = await buildSsrHeaders();
    const res = await fetch(`${API_BASE}/api/forum/comments/${commentId}/reply`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
    });
    let payload: any = null;
    try { payload = await res.json(); } catch { }
    return {
        ok: res.ok,
        reply: payload?.reply ?? payload?.comment,
        parent_comment_id: payload?.parent_comment_id,
        comments_count: typeof payload?.comments_count === "number" ? payload.comments_count : undefined,
    };
}

export async function ssrReactToComment(
    commentId: string | number,
    body?: { reaction?: string }
): Promise<{ ok: boolean; comment?: ForumComment; reaction?: string | null }> {
    const headers = await buildSsrHeaders();
    const res = await fetch(`${API_BASE}/api/forum/comments/${commentId}/react`, {
        method: "POST",
        headers: body ? { ...headers, "Content-Type": "application/json" } : headers,
        body: body ? JSON.stringify(body) : undefined,
        cache: "no-store",
    });
    let payload: any = null;
    try { payload = await res.json(); } catch { }
    return {
        ok: res.ok,
        comment: payload?.comment,
        reaction: typeof payload?.reaction === "string" ? payload.reaction : payload?.reaction ?? null,
    };
}

export async function ssrCreatePost(body: { content_html: string; images?: string[] }): Promise<{ ok: boolean; post?: any }> {
    const headers = await buildSsrHeaders();
    const res = await fetch(`${API_BASE}/api/forum/posts`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
    });
    let payload: any = undefined;
    try { payload = await res.json(); } catch { }
    return { ok: res.ok, post: payload?.post ?? payload };
}

export async function ssrDeletePost(id: string | number): Promise<{ ok: boolean }> {
    const headers = await buildSsrHeaders();
    const res = await fetch(`${API_BASE}/api/forum/posts/${id}`, {
        method: "DELETE",
        headers,
        cache: "no-store",
    });
    return { ok: res.ok };
}

export type { ForumPost, ForumComment, ForumReactionBreakdown };


