import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'add_blogpost':
      return [...state, {title: `Blog Post #${state.length + 1}`}];
    case 'clear':
      return [];
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return () => {
    dispatch({type: 'add_blogpost'})
  };
};
const clear = (dispatch) => {
  return () => {
    dispatch({type: 'clear'})
  };
};

export const {Context, Provider} = createDataContext(
  blogReducer,
  {addBlogPost, clear},
  []);