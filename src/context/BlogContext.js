import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: `Blog Post #${state.length + 1}`
        }
      ];
    case "delete_blogpost":
      return state.filter(blogPost => blogPost.id !== action.payload);
    case "clear":
      return [];
    default:
      return state;
  }
};

const addBlogPost = dispatch => {
  return () => {
    dispatch({type: "add_blogpost"});
  };
};

const deleteItem = dispatch => {
  return id => {
    dispatch({type: "delete_blogpost", payload: id});
  };
};

const clear = dispatch => {
  return () => {
    dispatch({type: "clear"});
  };
};

export const {Context, Provider} = createDataContext(
  blogReducer,
  {addBlogPost, clear, deleteItem},
  []
);
