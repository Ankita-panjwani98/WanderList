import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useDataContext from "../context/DataContext";
import Item from "../DB/Item";
import Tag from "../DB/Tag";

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignItems: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    width: "70%",
    marginBottom: 10,
  },
  inputDark: {
    borderBottomWidth: 1,
    borderColor: "white",
    padding: 10,
    color: "white",
    width: "100%",
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
          style={settings.isDarkModeOn ? styles.inputDark : styles.input}
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder="Add a tag..."
          placeholderTextColor={settings.isDarkModeOn ? "white" : "lightgray"}
        />
        {inputValue.length > 0 && (
          <TouchableOpacity onPress={handleTagDelete}>
            <MaterialIcons name="cancel" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      {suggestionVisible && (
        <View style={{ display: "flex", flexDirection: "row" }}>
          {filteredTagsByInput.length > 0
            ? filteredTagsByInput.map((item) => {
                return (
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      backgroundColor: settings.isDarkModeOn
                        ? "#ceebdb"
                        : "#c1d0de",
                      borderRadius: 20,
                      marginTop: 20,
                      marginRight: 10,
                    }}
                    key={item.id}
                    onPress={() => handleTagSelect(item)}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                );
              })
            : null}
        </View>
      )}
    </View>
  );
}

export default TagAutocomplete;
