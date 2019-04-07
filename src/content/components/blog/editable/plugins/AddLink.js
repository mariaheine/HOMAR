import React, { Component } from "react";
import { Button, Badge, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { EditorState, Modifier, RichUtils, SelectionState } from "draft-js";
import getRangesForDraftEntity from "draft-js/lib/getRangesForDraftEntity";

const styles = {
  container: {
    marginLeft: "0.5rem"
  },

  containerDiv: {
    margin: "0 0.2rem"
  },
  linkBadge: {
    fontSize: "1rem",
    fontFamily: "Anonymous Pro, monospace"
  },
  popoverHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  popoverButton: {
    margin: "0 0.5em"
  },
  link: {
    color: "red",
    textDecoration: "underline"
  }
};

export const createLinkPlugin = () => {
  return {
    decorators: [
      {
        strategy: linkStrategy,
        component: LinkComponent
      }
    ]
  };
};

export default class AddLink extends Component {
  state = {
    popoverOpen: false,
    popoverHeader: "",
    popoverContent: "",
    isLinkSelected: false,
    url: ""
  };

  onAddLink = e => {
    e.preventDefault();
    const { editorState } = this.props;
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    if (!selection.isCollapsed()) {
      if (this.checkInvalidEntitiesInSelection()) {
        this.setState({
          popoverOpen: true,
          popoverHeader: "Failed to create link",
          popoverContent:
            "Please remember only plain text can be used as a link placeholder"
        });
        return;
      }
      if (this.getEntityKeyAtSelection()) {
        const removedLinkEditorState = RichUtils.toggleLink(
          editorState,
          selection,
          null
        );
        this.props.onChange(removedLinkEditorState);
      } else {
        navigator.clipboard.readText().then(e => {
          this.setState({ url: e }, () => {
            const contentStateWithEntity = contentState.createEntity(
              "LINK",
              "MUTABLE",
              { url: this.state.url }
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
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
          });
        });
      }
    } else {
      const entityKey = this.getEntityKeyAtSelection();
      if (
        entityKey
          ? contentState.getEntity(entityKey).getType() === "LINK"
          : false
      ) {
        const linkData = contentState.getEntity(entityKey).getData();
        this.setState({
          popoverOpen: true,
          popoverHeader: "Link at selection:",
          popoverContent: `🌐${linkData.url}`,
          isLinkSelected: true
        });
      } else {
        this.setState({
          popoverOpen: true,
          popoverHeader: "No link selected",
          popoverContent:
            "To create one copy desired link and press this button while selecting some text 🐱",
          isLinkSelected: false
        });
      }
    }
  };

  checkInvalidEntitiesInSelection = () => {
    const { editorState } = this.props;
    const contentState = editorState.getCurrentContent();
    const startKey = editorState.getSelection().getStartKey();
    const blockAtStart = contentState.getBlockForKey(startKey);
    const startOffset = editorState.getSelection().getStartOffset();
    const endOffset = editorState.getSelection().getEndOffset();

    for (let i = startOffset; i <= endOffset; i++) {
      let entityKey = blockAtStart.getEntityAt(i);
      if (
        entityKey
          ? contentState.getEntity(entityKey).getType() !== "LINK"
          : false
      ) {
        return true;
      }
    }
    return false;
  };

  getEntityKeyAtSelection = () => {
    const { editorState } = this.props;
    const contentState = editorState.getCurrentContent();
    const startKey = editorState.getSelection().getStartKey();
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    const startOffset = editorState.getSelection().getStartOffset();
    const entityKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

    return entityKey;
  };

  getEntitySelectionState = () => {
    const { editorState } = this.props;
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    const entityKey = this.getEntityKeyAtSelection();

    const selectionKey = selectionState.getAnchorKey();
    const selectionOffset = selectionState.getAnchorOffset();
    const block = contentState.getBlockForKey(selectionKey);
    const blockKey = block.getKey();

    let entitySelection;
    getRangesForDraftEntity(block, entityKey).forEach(range => {
      if (range.start <= selectionOffset && selectionOffset <= range.end) {
        entitySelection = new SelectionState({
          anchorOffset: range.start,
          anchorKey: blockKey,
          focusOffset: range.end,
          focusKey: blockKey,
          isBackward: false,
          hasFocus: selectionState.getHasFocus()
        });
      }
    });
    return entitySelection;
  };

  removelink = e => {
    e.preventDefault();
    const { editorState } = this.props;
    let entitySelectionState = this.getEntitySelectionState();

    this.props.onChange(
      RichUtils.toggleLink(editorState, entitySelectionState, null)
    );
  };

  togglePopover = () => {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  };

  componentDidUpdate(prevProps) {
    const { editorState } = this.props;

    if (this.state.popoverOpen && editorState !== prevProps.editorState) {
      this.togglePopover();
    }
  }

  render() {
    var RemoveButton = this.state.isLinkSelected ? (
      <Badge
        color="danger"
        style={styles.linkBadge}
        onMouseDown={this.removelink}
      >
        Remove
      </Badge>
    ) : null;

    return (
      <div style={styles.containerDiv}>
        <Badge
          id="linkBadge"
          color="primary"
          type="button"
          style={styles.linkBadge}
          onMouseDown={this.onAddLink}
        >
          Link
        </Badge>
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target="linkBadge"
        >
          <PopoverHeader>
            {RemoveButton} {this.state.popoverHeader}
          </PopoverHeader>
          <PopoverBody>{this.state.popoverContent}</PopoverBody>
        </Popover>
      </div>
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

export const LinkComponent = props => {
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
      🌐{props.children}
    </a>
  );
};
