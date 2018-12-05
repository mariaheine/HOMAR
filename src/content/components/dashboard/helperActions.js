import { Editor, EditorState, convertFromRaw } from "draft-js";

// export const postDisplayFilers = {};

const covertDataFromRaw = data => {

    let DataFromRaw = convertFromRaw(JSON.parse(data));
    let EditorData = EditorState.createWithContent(DataFromRaw);

    return {
        EditorData
    }  
}

export const requestDisplayablePostByLanguage = (post, language) => {
  let postTitle;
  let postContent;
  let postSummary


  if (post) {
    var dataSource;
    switch (language) {
      case "pl":
        dataSource = post.polish;
        break;
      case "en":
        // Check here if data isnt empty, itf is - fallback to polish version
        // Also could add a notification that its not available in english
        dataSource = post.english.title ? post.english : post.polish;
        break;
    }
    postTitle = dataSource.title;

    postSummary = covertDataFromRaw(dataSource.summary).EditorData;
    postContent = covertDataFromRaw(dataSource.content).EditorData;

    // let DataToDisplay = dataSource.content;
    // let DataFromRaw = convertFromRaw(JSON.parse(DataToDisplay));
    // postContent = EditorState.createWithContent(DataFromRaw);
    // console.log(postContent);

  } else {
    postTitle = "🌊wait🐋for🐟🐳it💦";
    postSummary = EditorState.createEmpty();
    postContent = EditorState.createEmpty();
  }

  return {
    title: postTitle,
    summary: postSummary,
    content: postContent
  };
};
