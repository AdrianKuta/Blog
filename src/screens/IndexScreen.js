import React, {useContext} from "react";
import {View, Text, FlatList, Button, StyleSheet} from "react-native";
import {Context as BlogContext} from "../context/BlogContext";

const IndexScreen = () => {
    const {state, addBlogPost, clear} = useContext(BlogContext);

    return <View>
        <Text>Index Screen</Text>
      <Button style={styles.buttonStyle} title='Add Blog Post' onPress={addBlogPost}/>
      <Button style={styles.buttonStyle} title='Clear all' onPress={clear}/>
        <FlatList
         data={state}
         renderItem={({item}) => {
             return <Text>{item.title}</Text>
         }}
         keyExtractor={(item) => item.title}
        />
    </View>
};

const styles = StyleSheet.create({
  buttonStyle: {
    margin: 10
  }
});

export default IndexScreen;