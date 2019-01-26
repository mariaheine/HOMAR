const initState = {
  posts: [
    { id: "1", content: "Asd article ONE ONE ONE" },
    { id: "2", content: "Asd article TWO TOWASDASF SD TWO" }
  ]
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_POST":
      return state;
    case "CREATE_POST_ERROR":
    default:
      return state;
  }
};

export default postReducer;
