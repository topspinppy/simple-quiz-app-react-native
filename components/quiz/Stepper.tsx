import { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";

type Source = {
  screen(): React.ReactNode;
};

interface IStepperProps {
  steps: Source[];
  stepAction: {
    setStepIndex: React.Dispatch<React.SetStateAction<number>>;
    stepIndex: number;
  };
}

export default function Stepper(props: IStepperProps) {
  const { stepAction } = props
  
  return (
    <>
      <View style={styles.containerStepper} key={stepAction.stepIndex + "1"}>
        <View style={styles.fixToText}>
          <Button
            title="Prev"
            onPress={() => {
              stepAction.setStepIndex((prev) => prev - 1);
            }}
            disabled={stepAction.stepIndex === 0}
          />
          <Text>
            {stepAction.stepIndex + 1}/{props.steps.length}
          </Text>
          <Button
            title="Next"
            onPress={() => {
              stepAction.setStepIndex((prev) => prev + 1);
            }}
            disabled={stepAction.stepIndex + 1 === props.steps.length}
          />
        </View>
      </View>
      <View>
        <View style={styles.containerQuestion}>
          {props.steps[stepAction.stepIndex]?.screen()}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerStepper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
  },
  stepper: {
    borderStyle: "solid",
    borderColor: "#50C878",
    borderWidth: 2,
    borderRadius: 30,
    marginLeft: 5,
    width: 35,
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  containerQuestion: {
    margin: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  fixToText: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
