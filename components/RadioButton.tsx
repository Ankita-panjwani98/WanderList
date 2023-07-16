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
  radioIndicator: {
    width: 13,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 6,
  },
  radioIndicatorSelected: {
    backgroundColor: "#3cb371",
  },
  radioLabel: {
    fontSize: 12,
    color: "#333",
  },
});

type Option = {
  label: string;
  value: string;
};

type RadioButtonProps = {
  options: Option[];
  selectedOption: string;
  onSelect: (value: string) => void;
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
          style={styles.radioContainer}
          onPress={() => onSelect(option.value)}
        >
          <View
            style={[
              styles.radioIndicator,
              option.value === selectedOption && styles.radioIndicatorSelected,
            ]}
          />
          <Text style={styles.radioLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
