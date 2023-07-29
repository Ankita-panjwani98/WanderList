import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import Item from "../DB/Item";
import Tag from "../DB/Tag";

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
    padding: 10,
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

  const renderSuggestionItem = ({ item }: { item: Tag }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleTagSelect(item)}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder="Type a tag..."
      />
      <FlatList
        data={filteredTagsByInput}
        renderItem={renderSuggestionItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default TagAutocomplete;
