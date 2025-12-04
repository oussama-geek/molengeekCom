"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Handshake, Coins, Clock, Building } from "lucide-react";

interface PaymentChoiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUseTokens: () => void;
  onRequestSponsorship: () => void;
  item: {
    title: string;
    price: number;
    tokens?: number;
    type: string;
    duration?: string;
    description?: string;
  };
}

export function PaymentChoiceDialog({
  isOpen,
  onClose,
  onUseTokens,
  onRequestSponsorship,
  item
}: PaymentChoiceDialogProps) {
  const handleUseTokens = () => {
    onUseTokens();
    alert("Added to cart!");
  };

  const handleRequestSponsorship = () => {
    onRequestSponsorship();
    alert("Request sent!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Choose Payment Method</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Item Details */}
          <Card className="border-2 border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    €{item.price.toLocaleString()}
                  </span>
                  {item.duration && (
                    <Badge variant="secondary" className="text-xs">
                      {item.duration}
                    </Badge>
                  )}
                </div>
                {item.tokens && (
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                    <Coins className="w-4 h-4" />
                    <span>{item.tokens} tokens</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Options */}
          <div className="grid grid-cols-1 gap-3">
            {/* Use Tokens Option */}
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-green-300 dark:hover:border-green-700"
              onClick={handleUseTokens}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Coins className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-700 dark:text-green-300">Use Tokens</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pay with your available tokens
                    </p>
                  </div>
                  {item.tokens && (
                    <Badge variant="outline" className="text-xs">
                      {item.tokens} tokens
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Request Sponsorship Option */}
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300 dark:hover:border-blue-700"
              onClick={handleRequestSponsorship}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Handshake className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-700 dark:text-blue-300">Request Sponsorship</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ask a company to sponsor this for you
                    </p>
                  </div>
                  {/* <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Pending</span>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cancel Button */}
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
