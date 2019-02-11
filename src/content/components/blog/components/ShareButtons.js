import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";

var shareButtons = {
  display: "flex"
};

const ShareButtons = props => {
  const { displayPost, postId } = props;

  if (!displayPost) {
    return null;
  }

  // console.log(displayPost)

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

export default ShareButtons;
