import React, { Component } from "react";
import { Modifier, EditorState, RichUtils } from "draft-js";
import { Badge, Popover, PopoverHeader, PopoverBody } from "reactstrap";

export const colorStyleMap = {
  red: {
    color: "rgba(255, 0, 0, 1.0)"
  },
  orange: {
    color: "rgba(255, 127, 0, 1.0)"
  },
  yellow: {
    color: "rgba(180, 180, 0, 1.0)"
  },
  green: {
    color: "rgba(0, 180, 0, 1.0)"
  },
  blue: {
    color: "rgba(0, 0, 255, 1.0)"
  },
  indigo: {
    color: "rgba(75, 0, 130, 1.0)"
  },
  violet: {
    color: "rgba(127, 0, 255, 1.0)"
  }
};

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false
    };
  }

  toggleColor = toggledColor => {
    const { editorState } = this.props;
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap).reduce(
      (contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color);
      },
      editorState.getCurrentContent()
    );

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-inline-style"
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    this.props.onChange(nextEditorState);
  };

  togglePopover = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };

  render() {
    const { editorState } = this.props;

    if (!!!editorState) {
      return null;
    }

    return (
      <div>
        <Badge id="colorBadge" color="warning" onClick={this.togglePopover}>
          Colours
        </Badge>
        <Popover
          style={styles.colorPalette}
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target="colorBadge"
        >
          <PopoverBody>
            <ColorControls
              editorState={editorState}
              onToggle={this.toggleColor}
            />
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

class StyleButton extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let style;
    if (this.props.active) {
      style = { ...styles.styleButton, ...colorStyleMap[this.props.style] };
    } else {
      style = styles.styleButton;
    }

    let newStyle = {
      ...styles.colorPick,
      backgroundColor: colorStyleMap[this.props.style].color
    };

    // console.log(this.props.style);

    return (
      //   <span style={style} onMouseDown={this.onToggle}>
      //     {this.props.label}
      //   </span>
      <div style={newStyle} />
    );
  }
}

// var COLORS = [
//   { label: "Red", style: "red" },
//   { label: "Orange", style: "orange" },
//   { label: "Yellow", style: "yellow" },
//   { label: "Green", style: "green" },
//   { label: "Blue", style: "blue" },
//   { label: "Indigo", style: "indigo" },
//   { label: "Violet", style: "violet" }
// ];

const ColorControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  let i = 0;
  return (
    <div style={styles.controls}>
      {Object.keys(colorStyleMap).map(type => {
        i = i + 1;
        return (
          <StyleButton
            key={`${type}${i}`}
            active={currentStyle.has(type.style)}
            label={"asd"}
            onToggle={props.onToggle}
            style={type}
          />
        );
      })}
    </div>
  );
};

const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    fontSize: 14,
    padding: 20,
    width: 600
  },
  editor: {
    borderTop: "1px solid #ddd",
    cursor: "text",
    fontSize: 16,
    marginTop: 20,
    minHeight: 400,
    paddingTop: 20
  },
  colorPalette: {
    width: "10rem",
    height: "auto"
  },
  controls: {
    display: "flex",
    flexWrap: "wrap",
    fontFamily: "'Helvetica', sans-serif",
    fontSize: 14,
    marginBottom: 10,
    userSelect: "none"
  },
  colorPick: {
    backgroundColor: "black",
    width: "20px",
    height: "10px",
    margin: "2px"
  },
  styleButton: {
    color: "#999",
    cursor: "pointer",
    marginRight: 16,
    padding: "2px 0"
  }
};
