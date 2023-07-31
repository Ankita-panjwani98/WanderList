import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import useDataContext from "../context/DataContext";
import Item from "../DB/Item";
import Tag from "../DB/Tag";

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignItems: "flex-start",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    width: "100%",
  },
  inputDark: {
    borderBottomWidth: 1,
    borderColor: "white",
    padding: 10,
    color: "white",
    width: "100%",
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "lightgray",
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

  // Combine tags from listTag and existing tags in bucketList items
  const allTags = [
    ...listTag,
    ...bucketListItems.map((item) => item.tag),
  ].filter(Boolean);
  const filteredTags: Tag[] = allTags.filter(isTag).map((tag) => tag as Tag);

  const formatTag = (tag: string): string => {
    const formattedTag = tag.trim().toLowerCase();
    return formattedTag.startsWith("#") ? formattedTag : `#${formattedTag}`;
  };

  const filteredTagsByInput = filteredTags.filter((tag) =>
    tag.name.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  const handleInputChange = (text: string) => {
    const formattedTag = formatTag(text);
    setInputValue(formattedTag);

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
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={settings.isDarkModeOn ? styles.inputDark : styles.input}
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder="Type a tag..."
        placeholderTextColor={settings.isDarkModeOn ? "white" : "lightgray"}
      />

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
    </View>
  );
}

export default TagAutocomplete;
