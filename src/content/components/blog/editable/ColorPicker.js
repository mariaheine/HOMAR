import React, { Component } from "react";
import { Modifier, EditorState, RichUtils } from "draft-js";

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

class ColorPicker extends Component {
  constructor(props) {
    super(props);
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

  render() {
    const { editorState } = this.props;

    if(!(!!editorState)) {
        return null
    }

    return (
      <ColorControls
        editorState={editorState}
        onToggle={this.toggleColor}
      />
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

    return (
      <span style={style} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

var COLORS = [
  { label: "Red", style: "red" },
  { label: "Orange", style: "orange" },
  { label: "Yellow", style: "yellow" },
  { label: "Green", style: "green" },
  { label: "Blue", style: "blue" },
  { label: "Indigo", style: "indigo" },
  { label: "Violet", style: "violet" }
];

const ColorControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  let i = 0;
  return (
    <div style={styles.controls}>
      {COLORS.map(type => {
        i = i + 1;
        return (
          <StyleButton
            key={`${type}_${i}`}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
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
  controls: {
    fontFamily: "'Helvetica', sans-serif",
    fontSize: 14,
    marginBottom: 10,
    userSelect: "none"
  },
  styleButton: {
    color: "#999",
    cursor: "pointer",
    marginRight: 16,
    padding: "2px 0"
  }
};

export default ColorPicker;
