import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  radioContainerSelected: {
    backgroundColor: "#3cb371",
    borderRadius: 10,
    padding: 6,
  },
  radioIndicator: {
    width: 13,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#666666",
    marginRight: 6,
  },
  radioIndicatorSelected: {
    backgroundColor: "#666666",
  },
  radioLabel: {
    fontSize: 11,
    color: "#666666",
  },
  radioLabelSelected: {
    color: "white",
    fontWeight: "bold",
  },
});

type Option = {
  label: string;
  value: string | null;
};

type RadioButtonProps = {
  options: Option[];
  selectedOption: string | null;
  onSelect: (value: string | null) => void;
};

export default function RadioButton({
  options,
  selectedOption,
  onSelect,
}: RadioButtonProps) {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.radioContainer,
            option.value === selectedOption && styles.radioContainerSelected,
          ]}
          onPress={() => onSelect(option.value)}
        >
          <View
            style={[
              styles.radioIndicator,
              option.value === selectedOption && styles.radioIndicatorSelected,
            ]}
          />
          <Text
            style={[
              styles.radioLabel,
              option.value === selectedOption && styles.radioLabelSelected,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
