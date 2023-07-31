import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Item from "../DB/Item";
import Tag from "../DB/Tag";
import useDataContext from "../context/DataContext";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
    // color: "black",
    padding: 10,
    width: "70%",
    marginBottom: 10,
  },
  suggestionItem: {
    borderColor: "lightgray",
    padding: 10,
    borderBottomWidth: 1,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  selectedItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "lightblue",
  },
  suggestionContainer: {
    backgroundColor: "#fff",
    width: "80%",
    marginTop: 5,
  },
});

const isTag = (tag: string | Tag | undefined): tag is Tag => {
  return !!tag && (tag as Tag).name !== undefined;
};

function TagAutocomplete({
  listTag,
  bucketListItems,
  selectedTag,
  onTagsChange,
}: {
  listTag: Tag[];
  bucketListItems: Item[];
  selectedTag: string;
  onTagsChange: (tagName: string) => void;
}) {
  const { settings } = useDataContext();

  const [inputValue, setInputValue] = useState(selectedTag);
  const [filteredTagsByInput, setFilteredTagsByInput] = useState<Tag[]>([]);
  const [suggestionVisible, setSuggestionVisible] = useState(false);

  const formatTag = (tag: string): string => {
    const formattedTag = tag.trim().toLowerCase();
    return formattedTag.startsWith("#") ? formattedTag : `#${formattedTag}`;
  };

  const handleInputChange = (text: string) => {
    const formattedTag = formatTag(text);
    setInputValue(formattedTag);
    setSuggestionVisible(true);

    if (
      formattedTag &&
      filteredTagsByInput.every((tag) => tag.name !== formattedTag)
    ) {
      onTagsChange(formattedTag);
    }
  };

  const handleTagSelect = (tag: Tag) => {
    setInputValue(tag.name);
    onTagsChange(tag.name);
    setSuggestionVisible(false);
  };

  const handleTagDelete = () => {
    setInputValue(""); // Clear the input field
    onTagsChange(""); // Clear the selected tag
    setSuggestionVisible(false); // Hide the suggestion container
  };

  const renderSuggestionItem = ({ item }: { item: Tag }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleTagSelect(item)}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    // Calculate filteredTags inside the useEffect
    const allTags = [
      ...listTag,
      ...bucketListItems.map((item) => item.tag),
    ].filter(Boolean);
    const filteredTags: Tag[] = allTags.filter(isTag).map((tag) => tag as Tag);

    // Filter the tags based on the user's input
    const filterTagsByInput = filteredTags.filter((tag) =>
      tag.name.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setFilteredTagsByInput(filterTagsByInput);
  }, [inputValue, bucketListItems, listTag]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            { color: settings.isDarkModeOn ? "white" : "lightgray" },
          ]}
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder="Type a tag..."
          placeholderTextColor={settings.isDarkModeOn ? "white" : "lightgray"}
        />
        {inputValue.length > 0 && (
          <TouchableOpacity onPress={handleTagDelete}>
            <MaterialIcons name="cancel" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      {suggestionVisible && (
        <View style={styles.suggestionContainer}>
          <FlatList
            data={filteredTagsByInput}
            renderItem={renderSuggestionItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
}

export default TagAutocomplete;
