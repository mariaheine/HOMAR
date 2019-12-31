import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Badge,
  Popover,
  PopoverHeader,
  PopoverBody,
  InputGroup,
  InputGroupAddon,
  Button,
  Input
} from "reactstrap";
import { EditorState, RichUtils, SelectionState } from "draft-js";
import getRangesForDraftEntity from "draft-js/lib/getRangesForDraftEntity";
import getBlockMapKeys from "draft-js-focus-plugin/lib/utils/getBlockMapKeys";

import { SET_LINKED_URL } from "reduxStore/types";

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

export const plugindecoraator = {
  decorators: [
    {
      strategy: linkStrategy,
      component: LinkComponent
    }
  ]
};

class AddLink extends Component {
  state = {
    popoverOpen: false,
    popoverHeader: "",
    popoverContent: "",
    isLinkSelected: false
  };

  handleLinkUrlChange = e => {
    this.setState({ url: e.target.value });
  };

  getSelectedText = () => {
    // A bit mad just for getting text conent, is draft.js insane?

    const { editorState } = this.props;
    var selectionState = editorState.getSelection();
    var anchorKey = selectionState.getAnchorKey();
    var currentContent = editorState.getCurrentContent();
    var currentContentBlock = currentContent.getBlockForKey(anchorKey);
    var start = selectionState.getStartOffset();
    var end = selectionState.getEndOffset();
    var selectedText = currentContentBlock.getText().slice(start, end);

    return selectedText;
  };

  onLinkButtonPressed = e => {
    e.preventDefault();

    if (this.state.popoverOpen === true) {
      this.togglePopover();
      return;
    }

    const { editorState, linkedUrl } = this.props;
    const contentState = editorState.getCurrentContent();

    const entityKey = this.getEntityKeyAtSelection();
    const hasLinkEntityAtSelection = entityKey // rework into a function lib
      ? contentState.getEntity(entityKey).getType() === "LINK"
      : false;

    let popoverHeader, popoverContent;

    var popoverHeaderData = {
      headerText: "",
      confirmationButtonText: "",
      confirmationButtonClickAction: null,
      confirmationButtonColor: ""
    };

    if (hasLinkEntityAtSelection) {

      popoverHeaderData.headerText = "Link at selection:";
      popoverHeaderData.confirmationButtonText = "Remove";
      popoverHeaderData.confirmationButtonClickAction = () => this.removeLink();
      popoverHeaderData.confirmationButtonColor = "danger";

      const linkData = contentState.getEntity(entityKey).getData();

      popoverContent = <PopoverBody>{`🌐${linkData.url}`}</PopoverBody>;
    } else {

      popoverHeaderData.headerText = "Create new link at selection:";
      popoverHeaderData.confirmationButtonText = "Create";
      popoverHeaderData.confirmationButtonClickAction = () => this.addLink();
      popoverHeaderData.confirmationButtonColor = "primary";

      popoverContent = (
        <PopoverBody>
          {`Selected text: ${this.getSelectedText()}`}
          <br />
          {`Target url: ${linkedUrl}`}
        </PopoverBody>
      );
    }

    popoverHeader = <LinkPopoverHeader data={popoverHeaderData}/>;

    this.setState({
      popoverOpen: true,
      popoverHeader,
      popoverContent,
      isLinkSelected: true // check what is it
    });
  };

  addLink = () => {
    const { editorState, linkedUrl } = this.props;
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
        const contentStateWithEntity = contentState.createEntity(
          "LINK",
          "MUTABLE",
          { url: linkedUrl }
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
        this.togglePopover();
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
          popoverHeader: "Selected link:",
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

  removeLink = () => {
    // e.preventDefult();
    const { editorState } = this.props;
    let entitySelectionState = this.getEntitySelectionState();

    this.props.onChange(
      RichUtils.toggleLink(editorState, entitySelectionState, null)
    );

    this.togglePopover();
  };

  togglePopover = () => {
    this.setState({ popoverOpen: !this.state.popoverOpen });
    // this.setState({ popoverOpen: true });
  };

  componentDidUpdate(prevProps) {
    const { editorState } = this.props;

    // what was that for? hmmm
    // ah, failed attempt to refresh popover when selection changed
    // if (this.state.popoverOpen && editorState !== prevProps.editorState) {
    //   this.togglePopover();
    // }
  }

  render() {
    return (
      <div style={styles.containerDiv}>
        <Badge
          id="linkBadge"
          color="primary"
          type="button"
          style={styles.linkBadge}
          onMouseDown={this.onLinkButtonPressed}
        >
          Link
        </Badge>
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target="linkBadge"
        >
          {this.state.popoverHeader}
          {this.state.popoverContent}
        </Popover>
      </div>
    );
  }
}

function LinkPopoverHeader(data) {
  var {
    headerText,
    confirmationButtonText,
    confirmationButtonClickAction,
    confirmationButtonColor
  } = data.data;

  return (
    <PopoverHeader>
      <div style={styles.popoverHeaderConatiner}>
        <p style={styles.popoverHeaderText}>{headerText}</p>
        <ConfirmLinkButton
          text={confirmationButtonText}
          onClick={confirmationButtonClickAction}
          color={confirmationButtonColor}
        />
      </div>
    </PopoverHeader>
  );
}

function ConfirmLinkButton(data) {
  var { text, onClick, color } = data;

  return (
    <Badge color={color} style={styles.linkBadge} onMouseDown={onClick}>
      {text}
    </Badge>
  );
}

const mapStateToProps = state => {
  return {
    linkedUrl: state.postEdit.linkedUrl
  };
};

export default connect(mapStateToProps)(AddLink);

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
      style={styles.link}
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      aria-label={url}
    >
      🌐{props.children}
    </a>
  );
};

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
  popoverHeaderConatiner: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  popoverHeaderText: {
    color: "black",
    paddingLeft: "1em",
    marginBottom: 0
  },
  popoverButton: {
    margin: "0 0.5em"
  },
  link: {
    textDecoration: "underline"
  }
};
