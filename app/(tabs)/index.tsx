import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Start from "@/components/quiz/Start";
import Stepper from "@/components/quiz/Stepper";
import useQuizContext from "@/context/useQuizContext";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";

interface AnswerState {
  answer: string;
  isCorrect: boolean;
}

export default function HomeScreen() {
  const context = useQuizContext();
  const navigation = useNavigation()
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, AnswerState>
  >({});

  // useEffect(() => {
  //   context.step.setStepIndex(0)
  // },[context.step])

  const handleAnswerPress = (
    questionIndex: number,
    answer: string,
    correctAnswer: string
  ) => {
    const isCorrect = context.checkAnswer(answer, correctAnswer) !== "error";
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: { answer, isCorrect },
    }));
  };

  const renderSteps = () => {
    return context.quiz.map((quiz, questionIndex) => {
      const selectedAnswer = selectedAnswers[questionIndex];
      return {
        screen: () => {
          return (
            <View key={questionIndex}>
              <View style={styles.containerQuestion}>
                <Text>{quiz.question}</Text>
              </View>

              <View>
                {quiz.answers.map((answer) => {
                  const isSelected = selectedAnswer?.answer === answer;
                  const isCorrect = selectedAnswer?.isCorrect;
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        handleAnswerPress(
                          questionIndex,
                          answer,
                          quiz.correctAnswer
                        );
                      }}
                    >
                      <View
                        style={[
                          styles.boxAnswer,
                          isSelected && !isCorrect && styles.boxAnswerFalse,
                          isSelected && isCorrect && styles.boxAnswerTrue,
                        ]}
                      >
                        <Text>{answer}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        },
      };
    });
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <Start />
        <Stepper
          steps={renderSteps()}
          stepAction={{
            stepIndex: context.step.stepIndex,
            setStepIndex: context.step.setStepIndex,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerQuestion: {
    paddingTop: 10,
    paddingBottom: 10,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  boxAnswer: {
    marginBottom: 10,
    padding: 20,
    backgroundColor: "#C0C0C0",
  },

  boxAnswerTrue: {
    backgroundColor: "#4CBB17",
  },
  boxAnswerFalse: {
    backgroundColor: "red",
  },
});
