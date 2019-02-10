import { EditorState, ContentState, convertFromRaw } from "draft-js";

const covertDataFromRaw = data => {
  let DataFromRaw = convertFromRaw(JSON.parse(data));
  let EditorData = EditorState.createWithContent(DataFromRaw);

  return {
    EditorData
  };
};

const displayableContentFromString = text => {
  return EditorState.createWithContent(ContentState.createFromText(text));
};

export const requestDisplayableContent = rawContent => {
  if (rawContent) {
    return {
      content: covertDataFromRaw(rawContent).EditorData
    };
  } else {
    let altContent = "Null content data 😿";
    EditorState.createWithContent(ContentState.createFromText(altContent));
  }
};

export const requestDisplayablePostByLanguage = (post, language) => {
  let postTitle;
  let postContent;
  let postSummary;
  let hasContent;

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
          return {            
            title: covertDataFromRaw(altTitle).EditorData,
            summary: displayableContentFromString(altSummary),
            content: EditorState.createEmpty(),
            hasContent: false
          };
        }
        break;
    }

    postTitle = covertDataFromRaw(dataSource.title).EditorData;
    postSummary = covertDataFromRaw(dataSource.summary).EditorData;
    postContent = covertDataFromRaw(dataSource.content).EditorData;

    hasContent = postContent.getCurrentContent().hasText();
    
  } else {
    postTitle = EditorState.createEmpty();
    postSummary = EditorState.createEmpty();
    postContent = EditorState.createEmpty();
  }

  return {
    title: postTitle,
    summary: postSummary,
    content: postContent,
    hasContent
  };
};
