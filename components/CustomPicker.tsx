import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Tag from "../DB/Tag";
import useDataContext from "../context/DataContext";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    width: "70%",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    maxHeight: "80%",
  },
  pickerItem: {
    paddingVertical: 10,
  },
});

function CustomPicker({
  listTag,
  selectedTag,
  onTagsChange,
}: {
  listTag: Tag[];
  selectedTag: string;
  onTagsChange: (tagName: string) => void;
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const { settings } = useDataContext();

  const handleModalToggle = () => {
    setModalVisible((prevState) => !prevState);
  };

  const handleTagSelect = (tag: Tag) => {
    onTagsChange(tag.name);
    setModalVisible(false);
  };

  let borderColor;
  if (settings.isDarkModeOn) {
    borderColor = selectedTag !== "none" ? "#e3b836" : "white";
  } else {
    borderColor = selectedTag !== "none" ? "green" : "grey";
  }

  let textColor;
  if (settings.isDarkModeOn) {
    textColor = selectedTag !== "none" ? "#e3b836" : "white";
  } else {
    textColor = selectedTag !== "none" ? "green" : "grey";
  }

  return (
    <View
      style={{
        borderWidth: 0.5,
        borderColor,
        borderStyle: "dotted",
        margin: 10,
        padding: 5,
        borderRadius: 10,
      }}
    >
      <TouchableOpacity onPress={handleModalToggle}>
        <Text style={{ color: textColor }}>
          {selectedTag !== "none" ? selectedTag : "Tag"}
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={handleModalToggle}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              style={[styles.pickerItem]}
              onPress={() => {
                onTagsChange(""); // Set an empty string to reset the tag filter
                setModalVisible(false);
              }}
            >
              <Text>Tag</Text>
            </TouchableOpacity>
            {listTag.map((tag) => (
              <TouchableOpacity
                key={tag.id}
                style={[styles.pickerItem]}
                onPress={() => handleTagSelect(tag)}
              >
                <Text>{tag.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CustomPicker;
