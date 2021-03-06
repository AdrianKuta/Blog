import React, { useContext, useEffect } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Context as BlogContext } from "../context/BlogContext";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  const { state, deleteItem, getBlogPosts } = useContext(BlogContext);

  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener("didFocus", () => {
      getBlogPosts();
    });

    return () => {
      listener.remove();
    };
  }, []);

  function getRenderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Show", { id: item.id })}
      >
        <View style={styles.rowStyle}>
          <Text style={styles.titleStyle}>
            {item.title} - {item.id}
          </Text>
          <TouchableOpacity onPress={() => deleteItem(item.id)}>
            <MaterialCommunityIcons
              name="delete-outline"
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <FlatList
        data={state}
        renderItem={getRenderItem}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <MaterialIcons name="add" size={30} />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  buttonStyle: {
    margin: 10
  },
  rowStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "gray"
  },
  iconStyle: {
    fontSize: 24
  },
  titleStyle: {
    fontSize: 18
  }
});

export default IndexScreen;
