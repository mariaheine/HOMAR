const initState = {
  posts: [
    { id: "1", content: "Asd article ONE ONE ONE" },
    { id: "2", content: "Asd article TWO TOWASDASF SD TWO" }
  ]
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_POST":
      console.log("=======================================");
      console.log("created post", action.post.rawContent);
      console.log("=======================================");
      return state;
    case "CREATE_POST_ERROR":
      console.log("=======================================");
      console.log("create post error", action.err);
      console.log("=======================================");
    default:
      return state;
  }
};

export default postReducer;
