import React, { Component } from "react";
import { Modifier, EditorState, RichUtils } from "draft-js";
import { Badge, Popover, PopoverHeader, PopoverBody } from "reactstrap";

export const colorStyleMap = {
  white: {
    color: "#fff"
  },
  /* Summer rain palette */
  brightnavyblue: {
    color: "#1764E4"
  },
  ballblue: {
    color: "#2595D4"
  },
  maxbluegreen: {
    color: "#30B4C9"
  },
  eucalyptus: {
    color: "#38D5BA"
  },
  brighteucalyptus: {
    color: "#45F6AE"
  },
  /* BLUES, VIOLETS */
  indigoA200: {
    color: "rgba(83, 109, 254,1.0)"
  },
  indigoA400: {
    color: "rgba(61, 90, 254,1.0)"
  },
  indigo500: {
    color: "rgba(63, 81, 181,1.0)"
  },
  slateblue: {
    color: "rgb(106,90,205)"
  },
  mediumslateblue: {
    color: "rgb(123,104,238)"
  },
  mediumpurple: {
    color: "rgb(147,112,219)"
  },
  royalpurple: {
    color: "#814EA0"
  },
  mediumorchid: {
    color: "rgb(186,85,211)"
  },
  violet: {
    color: "rgb(238,130,238)"
  },
  plum: {
    color: "rgb(221,160,221)"
  },
  /* PINKS */
  pink: {
    color: "#E91E63"
  },
  cerisepink: {
    color: "#EA407B"
  },
  darkpink: {
    color: "#E14F76"
  },
  tulip: {
    color: "#FF7A8A"
  },
  charmpink: {
    color: "#E68CAA"
  },
  persianpink: {
    color: "#F78BC1"
  },
  /* REDS */
  awesomereds: {
    color: "#FF2251"
  },
  sizzlingred: {
    color: "#F93E57"
  },
  /* ORANGES */
  chineseorange: {
    color: "#EF693A"
  },
  darkorange: {
    color: "#FF8D04"
  },
  sunglow: {
    color: "#FCC63E"
  },
  vividyellow: {
    color: "#FFE401"
  },
  /* GREENS */
  pearlaqua: {
    color: "#8FC5B9"
  },
  tiffanyblue: {
    color: "#09BAC0"
  },
  teal: {
    color: "rgba(0, 150, 136,1.0)"
  },
  oceangreen: {
    color: "#4CC395"
  },
  darkhkaki: {
    color: "#B8C774"
  },
  pistachio: {
    color: "#94D56C"
  },
  dollarbill: {
    color: "#86C64C"
  },
  somegreen: {
    color: "#4CAF50"
  },
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
      <div style={styles.containerDiv}>
        <Badge
          style={styles.colorsBadgeButton}
          id="colorBadge"
          color="warning"
          type="button"
          onClick={this.togglePopover}
        >
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

    return (
      <div style={newStyle} onMouseDown={this.onToggle}/>
    );
  }
}


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
  colorPalette: {
    width: "9.6rem",
    height: "auto",
    backgroundColor: "#272727"
  },
  controls: {
    display: "flex",
    flexWrap: "wrap"
  },
  colorPick: {
    backgroundColor: "black",
    width: "1.5rem",
    height: "1rem",
    margin: "0.2rem"
  },
  colorsBadgeButton: {
    fontSize: "1rem",
    fontFamily: "Anonymous Pro, monospace"
  },
  containerDiv: {
    marginLeft: "0.2rem",
    marginRight: "auto",
    flexGrow: "1"
  },
  styleButton: {
    color: "#999",
    cursor: "pointer",
    marginRight: "auto",
    padding: "2px 0"
  }
};
