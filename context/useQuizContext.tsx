import { useContext } from "react";
import { QuizContext } from '@/context/context';


export default function useQuizContext() {
  const quizContextStore = useContext(QuizContext)

  if (!quizContextStore) {
    throw new Error('useQuizContext must be used within RootStoreProvider');
  }

  return quizContextStore
}