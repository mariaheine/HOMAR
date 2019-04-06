import React, { Component } from "react";
import { Badge } from "reactstrap";
import { EditorState, Modifier, RichUtils, KeyBindingUtil } from "draft-js";

export default class AddLink extends Component {
  onAddLink = e => {
    e.preventDefault();
    const { editorState } = this.props;
    const contentState = editorState.getCurrentContent();
    const currentSelection = editorState.getSelection();

    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: "http://localhost:3000/blog/" }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    // console.log(currentSelection);
    // const contentStateWithLink = Modifier.applyEntity(
    //   contentStateWithEntity,
    //   currentSelection,
    //   entityKey
    // );
    // const newEditorState = EditorState.push(editorState, {
    //   currentContent: contentStateWithLink
    // });
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    this.props.onChange(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );
  };

  render() {
    // console.log(this.props)

    return (
      <Badge id="colorBadge" color="warning" onMouseDown={this.onAddLink}>
        AddLink
      </Badge>
    );
  }
}

export const linkStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};

export const Link = props => {
  const { contentState, entityKey } = props;
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a
      className="link"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      aria-label={url}
    >
      {props.children}
    </a>
  );
};

const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    padding: 20,
    width: 600
  },
  buttons: {
    marginBottom: 10
  },
  urlInputContainer: {
    marginBottom: 10
  },
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 3
  },
  editor: {
    border: "1px solid #ccc",
    cursor: "text",
    minHeight: 80,
    padding: 10
  },
  button: {
    marginTop: 10,
    textAlign: "center"
  },
  link: {
    color: "red",
    textDecoration: "underline"
  }
};
