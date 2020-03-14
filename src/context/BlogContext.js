import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;
    case "edit_blogpost":
      return state.map(blogPost => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case "delete_blogpost":
      return state.filter(blogPost => blogPost.id !== action.payload);
    case "clear":
      return [];
    default:
      return state;
  }
};

const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get("/blogPosts");
    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

const addBlogPost = dispatch => {
  return async (title, content, callback) => {
    await jsonServer.post("/blogPosts", { title, content });
    if (callback) {
      callback();
    }
  };
};

const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogPosts/${id}`, { title, content });
    dispatch({ type: "edit_blogpost", payload: { id, title, content } });
    if (callback) {
      callback();
    }
  };
};

const deleteItem = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogPosts/${id}`);
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

const clear = dispatch => {
  return () => {
    dispatch({ type: "clear" });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, clear, deleteItem, editBlogPost, getBlogPosts },
  []
);
