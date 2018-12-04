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
      console.log("created post", action.post);
      console.log("=======================================");
  }
  return state;
};

export default postReducer;
