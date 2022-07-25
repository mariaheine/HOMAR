import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";
import { connect } from "react-redux";
import { compose } from "redux";
import { requestDisplayablePostByLanguage } from "../../../../../reduxStore/actions/helperActions";


var shareButtons = {
  display: "flex"
};

const ShareButtons = props => {
  const { displayPost, postId, language } = props;

  if (!displayPost) {
    return null;
  }

  let quote = displayPost.displayedContent.getCurrentContent().getPlainText();
  quote = quote.slice(0, 252);
  quote = `${quote} [...]`;

  return (
    <div style={shareButtons}>
      <TwitterShareButton
        url={`homar.xyz/blog/${postId}`}
        title={quote}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <FacebookShareButton url={`homar.xyz/blog/${postId}`} quote={quote}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps.displayPost);

  var result = requestDisplayablePostByLanguage(
    ownProps.displayPost,
    state.language.selectedLanguage
  );


  return {
    displayPost: {
      title: result.title,
      displayedContent: result.summary,
      hasContent: result.hasContent
    },
    selectedLanguage: state.language.selectedLanguage
  };
};

export default compose(
  connect(mapStateToProps)
)(ShareButtons);
