import { EditorState, ContentState, convertFromRaw } from "draft-js";

// export const postDisplayFilers = {};

const covertDataFromRaw = data => {
  let DataFromRaw = convertFromRaw(JSON.parse(data));
  let EditorData = EditorState.createWithContent(DataFromRaw);

  return {
    EditorData
  };
};

export const requestDisplayablePostByLanguage = (post, language) => {
  let postTitle;
  let postContent;
  let postSummary;
  let hasContent;

  // console.log("went through, lang: " + language)

  if (post) {
    var dataSource;
    switch (language) {
      case "pl":
        dataSource = post.polish;
        break;
      case "en":
        // Check here if data isnt empty, itf is - fallback to polish version
        // Also could add a notification that its not available in english
        if (post.english.title) {
          dataSource = post.english;
        } else {
          let altTitle = post.polish.title;
          let altSummary = "Not translated yet, sorry 😿";
          let altContent = "Not translated yet, sorry 😿";
          return {
            title: covertDataFromRaw(altTitle).EditorData,
            summary: EditorState.createWithContent(ContentState.createFromText(altSummary)),
            content: EditorState.createWithContent(ContentState.createFromText(altContent)),
            hasContent: false
          };
        }
        break;
    }

    postTitle = covertDataFromRaw(dataSource.title).EditorData;
    postSummary = covertDataFromRaw(dataSource.summary).EditorData;
    postContent = covertDataFromRaw(dataSource.content).EditorData;

    // let DataToDisplay = dataSource.content;
    // let DataFromRaw = convertFromRaw(JSON.parse(DataToDisplay));
    // postContent = EditorState.createWithContent(DataFromRaw);
    // console.log(postContent);
  } else {
    postTitle = EditorState.createEmpty();
    postSummary = EditorState.createEmpty();
    postContent = EditorState.createEmpty();
  }

  return {
    title: postTitle,
    summary: postSummary,
    content: postContent,
    hasContent: true
  };
};
