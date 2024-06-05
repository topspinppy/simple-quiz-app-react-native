import { QUESTIONS, randomQuestions } from "@/utils/questions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { router } from 'expo-router'

interface IQuizContextWrapper {
  children: React.ReactNode;
}

interface IContext {
  quiz: typeof QUESTIONS;
  checkAnswer: (currentAnswer: string, correctAnswer: string) => string;
  step: {
    setStepIndex: React.Dispatch<React.SetStateAction<number>>;
    stepIndex: number;
  };
}

export const QuizContext = createContext<IContext>({
  quiz: [],
  checkAnswer: (currentAnswer: string, correctAnswer: string) => "",
  step: {
    setStepIndex: () => {},
    stepIndex: 0,
  },
});

export default function QuizContextWrapper(props: IQuizContextWrapper) {
  const { children } = props;
  const randomQuiz = randomQuestions;
  const [point, setPoint] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const checkAnswer = (currentAnswer: string, correctAnswer: string) => {
    if (currentAnswer === correctAnswer) {
      setTimeout(async () => {
        if (stepIndex + 1 === randomQuiz.length) {
          router.push('/explore')
          return;
        }
        setPoint((point) => point + 1);
        setStepIndex((step) => step + 1);
      }, 1000);

      return "pass";
    }

    setTimeout(() => {
      setStepIndex((step) => step + 1);
    }, 1000)
    
    return "error";
  };

  useEffect(() => {
    const finished = async () => {
      let currentLeaderboard = (await AsyncStorage.getItem(
        "leaderBoard"
      )) as unknown as any[];
      let newData = {
        name: Math.random(),
        score: point,
      };
      if (currentLeaderboard == null) {
        currentLeaderboard = [];
        currentLeaderboard.push(newData);
      } else {
        currentLeaderboard = JSON.parse(currentLeaderboard as any);
        currentLeaderboard.push(newData);
      }
      await AsyncStorage.setItem(
        "leaderBoard",
        JSON.stringify(currentLeaderboard)
      ).catch(() => {
        console.log("error saving");
      });
    };
    console.log('not finished =>', stepIndex + 1, randomQuiz.length)

    if (stepIndex + 1 === randomQuiz.length) {
      console.log('finished =>', stepIndex + 1, randomQuiz.length)
      finished()
    }
  }, [stepIndex]);
  return (
    <QuizContext.Provider
      value={{
        quiz: randomQuiz,
        checkAnswer,
        step: { setStepIndex, stepIndex },
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
