import React, {useContext} from "react";
import {Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Context as BlogContext} from "../context/BlogContext";
import {MaterialCommunityIcons} from '@expo/vector-icons';

const IndexScreen = () => {
  const {state, addBlogPost, deleteItem, clear} = useContext(BlogContext);

  function getRenderItem({item}) {
    return <View style={styles.rowStyle}>
      <Text style={styles.titleStyle}>{item.title} - {item.id}</Text>
      <TouchableOpacity onPress={() => deleteItem(item.id)}>
        <MaterialCommunityIcons name="delete-outline" style={styles.iconStyle}/>
      </TouchableOpacity>
    </View>
  }

  return <View>
    <Button style={styles.buttonStyle} title='Add Blog Post' onPress={addBlogPost}/>
    <Button style={styles.buttonStyle} title='Clear all' onPress={clear}/>
    <FlatList
      data={state}
      renderItem={getRenderItem}
      keyExtractor={(item) => item.id}
    />
  </View>
};

const styles = StyleSheet.create({
  buttonStyle: {
    margin: 10
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray'
  },
  iconStyle: {
    fontSize: 24
  },
  titleStyle: {
    fontSize: 18
  }
});

export default IndexScreen;