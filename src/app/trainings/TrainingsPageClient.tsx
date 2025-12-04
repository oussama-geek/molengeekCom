"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/providers/I18nProvider";
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Answer = "A" | "B" | "C" | null;

export default function TrainingsPageClient() {
  const { t } = useI18n();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([null, null, null, null, null]);
  const [showResults, setShowResults] = useState(false);
  const [showCTAScreen, setShowCTAScreen] = useState(false);

  const questions = [
    "q1",
    "q2",
    "q3",
    "q4",
    "q5",
  ] as const;

  const handleAnswer = (answer: "A" | "B" | "C") => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setAnswers([null, null, null, null, null]);
    setCurrentQuestion(0);
    setShowResults(false);
    setShowCTAScreen(false);
    setQuizStarted(false);
  };

  const handleShowCTAScreen = () => {
    setShowCTAScreen(true);
  };

  const handleStart = () => {
    setQuizStarted(true);
  };

  const calculateResults = () => {
    const counts = { A: 0, B: 0, C: 0 };
    answers.forEach((answer) => {
      if (answer) counts[answer]++;
    });

    // Determine scenario based on majority
    let scenario: "scenario1" | "scenario2" | "scenario3";
    if (counts.A >= counts.B && counts.A >= counts.C) {
      scenario = "scenario1";
    } else if (counts.B >= counts.C) {
      scenario = "scenario2";
    } else {
      scenario = "scenario3";
    }

    setShowResults(true);
  };

  if (showResults && !showCTAScreen) {
    const counts = { A: 0, B: 0, C: 0 };
    answers.forEach((answer) => {
      if (answer) counts[answer]++;
    });

    let scenario: "scenario1" | "scenario2" | "scenario3";
    if (counts.A >= counts.B && counts.A >= counts.C) {
      scenario = "scenario1";
    } else if (counts.B >= counts.C) {
      scenario = "scenario2";
    } else {
      scenario = "scenario3";
    }

    return (
      <div className="space-y-4 max-w-full overflow-hidden">
        <div className="text-center mb-6 break-words">
          <CheckCircle2 className="w-16 h-16 text-[#811abd] mx-auto mb-4" />
          <p className="text-2xl font-bold text-[#811abd] mb-4 break-words">
            {t(`presentation.trainings.audit.results.${scenario}.score`)}
          </p>
        </div>

        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-[#811abd] max-w-full">
          <CardContent className="pt-6">
            <p className="text-foreground mb-4 break-words">
              {t(`presentation.trainings.audit.results.${scenario}.description`)}
            </p>
            <div className="bg-white rounded-lg p-4 border-l-4 border-[#811abd] break-words">
              <p className="text-sm font-semibold text-[#811abd] mb-2">💡</p>
              <p className="text-sm text-foreground break-words">
                {t(`presentation.trainings.audit.results.${scenario}.recommendation`)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleShowCTAScreen}
          className="w-full bg-[#811abd] hover:bg-[#811abd]/90 text-white"
          size="lg"
        >
          {t("presentation.trainings.audit.buttons.next")}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    );
  }

  if (showCTAScreen) {
    return (
      <div className="space-y-4 max-w-full overflow-hidden">
        <div className="text-center mb-6 break-words">
          <div className="w-20 h-20 rounded-full bg-[#811abd] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-[#811abd] mb-4 break-words">
            {t("presentation.trainings.audit.ctaScreen.title")}
          </h3>
        </div>

        <Card className="border-2 border-[#811abd] bg-white max-w-full">
          <CardContent className="pt-6">
            <p className="text-foreground mb-6 break-words text-center">
              {t("presentation.trainings.audit.ctaScreen.description")}
            </p>

            <Button
              onClick={() => {
                const formSection = document.getElementById("audit-form");
                if (formSection) {
                  formSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="w-full bg-[#811abd] hover:bg-[#811abd]/90 text-white mb-4"
              size="lg"
            >
              <span className="mr-2">👉</span>
              {t("presentation.trainings.audit.ctaScreen.button")}
            </Button>

            <p className="text-xs text-muted-foreground text-center break-words">
              {t("presentation.trainings.audit.ctaScreen.disclaimer")}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show start screen if quiz hasn't started
  if (!quizStarted) {
    return (
      <div className="space-y-6 max-w-full overflow-hidden text-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#811abd] break-words">
            {t("presentation.trainings.audit.title")}
          </h2>
          <p className="text-sm text-foreground break-words">
            {t("presentation.trainings.audit.subtitle")}
          </p>
        </div>
        <Button
          onClick={handleStart}
          className="w-full bg-[#811abd] hover:bg-[#811abd]/90 text-white"
          size="lg"
        >
          <Play className="w-5 h-5 mr-2" />
          {t("presentation.trainings.audit.buttons.start")}
        </Button>
      </div>
    );
  }

  const questionKey = questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      {/* Progress indicator */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
        <span className="whitespace-nowrap">Question {currentQuestion + 1} sur {questions.length}</span>
        <span className="whitespace-nowrap">
          {answers.filter((a) => a !== null).length} / {questions.length} répondues
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-[#811abd] h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="space-y-4 max-w-full">
        <div className="break-words">
          <h3 className="text-lg font-bold text-[#811abd] mb-2 break-words">
            {t(`presentation.trainings.audit.questions.${questionKey}.title`)}
          </h3>
          <p className="text-sm text-foreground mb-4 break-words">
            {t(`presentation.trainings.audit.questions.${questionKey}.question`)}
          </p>
        </div>

        {/* Answer options */}
        <div className="space-y-3 max-w-full">
          <Button
            onClick={() => handleAnswer("A")}
            className={`w-full text-left justify-start h-auto py-3 px-4 break-words whitespace-normal ${
              currentAnswer === "A"
                ? "bg-purple-100 border-2 border-[#811abd] text-[#811abd]"
                : "bg-white border-2 border-gray-300 text-foreground hover:bg-gray-50"
            }`}
            variant="outline"
          >
            <span className="mr-2 font-bold flex-shrink-0">A.</span>
            <span className="text-sm break-words">
              {t(`presentation.trainings.audit.questions.${questionKey}.optionA`)}
            </span>
          </Button>

          <Button
            onClick={() => handleAnswer("B")}
            className={`w-full text-left justify-start h-auto py-3 px-4 break-words whitespace-normal ${
              currentAnswer === "B"
                ? "bg-purple-100 border-2 border-[#811abd] text-[#811abd]"
                : "bg-white border-2 border-gray-300 text-foreground hover:bg-gray-50"
            }`}
            variant="outline"
          >
            <span className="mr-2 font-bold flex-shrink-0">B.</span>
            <span className="text-sm break-words">
              {t(`presentation.trainings.audit.questions.${questionKey}.optionB`)}
            </span>
          </Button>

          <Button
            onClick={() => handleAnswer("C")}
            className={`w-full text-left justify-start h-auto py-3 px-4 break-words whitespace-normal ${
              currentAnswer === "C"
                ? "bg-purple-100 border-2 border-[#811abd] text-[#811abd]"
                : "bg-white border-2 border-gray-300 text-foreground hover:bg-gray-50"
            }`}
            variant="outline"
          >
            <span className="mr-2 font-bold flex-shrink-0">C.</span>
            <span className="text-sm break-words">
              {t(`presentation.trainings.audit.questions.${questionKey}.optionC`)}
            </span>
          </Button>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-2 mt-6">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="flex-1 min-w-0"
          >
            <ChevronLeft className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{t("presentation.trainings.audit.buttons.previous")}</span>
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentAnswer === null}
            className="flex-1 bg-[#811abd] hover:bg-[#811abd]/90 text-white min-w-0"
          >
            <span className="truncate">
              {currentQuestion === questions.length - 1
                ? t("presentation.trainings.audit.buttons.seeResults")
                : t("presentation.trainings.audit.buttons.next")}
            </span>
            <ChevronRight className="w-4 h-4 ml-2 flex-shrink-0" />
          </Button>
        </div>
      </div>
    </div>
  );
}
