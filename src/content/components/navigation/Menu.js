import React, { Component } from "react";
import {
  NavLink,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { Link } from "react-router-dom";

var navHashtags = Array(
  "NAVIGATE",
  "EXTRAPOLATE",
  "MANIPULATE",
  "DISORIENTATE",
  "DISSIMULATE",
  "STIMULATE",
  "SIMULATE",
  "ASSIMILATE",
  "ALIENATE",
  "MEDITATE",
  "LACERATE",
  "INCUBATE",
  "REGULATE",
  "TERMINATE",
  "ACCELERATE",
  "ANTICIPATE",
  "INTOXICATE",
  "TESSELATE"
);

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    var littleInline = {
      margin: "1.2rem",
      marginLeft: "0.2rem",
      boxShadow: "0vw 1vh 5px black",
      alignSelf: "flex-end"
    };

    var littleOverride = {
      width: "11vw",
      minWidth: "130px",
      paddingLeft: "1vw",
      paddingRight: "1vw"
    };

    var navHashtag =
      navHashtags[Math.floor(Math.random() * navHashtags.length)];

    return (
      <div className="navbarComponent">
        <ButtonDropdown
          isOpen={!this.state.collapsed}
          toggle={this.toggleNavbar}
        >
          <DropdownToggle outline color="secondary" style={littleOverride}>
            {navHashtag}
          </DropdownToggle>
          <DropdownMenu>
            <NavLink href="/blog/" onClick={this.toggleNavbar}>
              <DropdownItem>
                <h1 className="menuButton">👾 blog</h1>
              </DropdownItem>
            </NavLink>
            <Link to="/entity/" onClick={this.toggleNavbar}>
              <DropdownItem>
                <h1 className="menuButton">🌋 die Entität</h1>
              </DropdownItem>
            </Link>
            <Link to="/manifesto/" onClick={this.toggleNavbar}>
              <DropdownItem>
                <h1 className="menuButton">✨ manifesto</h1>
              </DropdownItem>
            </Link>
            <Link to="/outrocuteness" onClick={this.toggleNavbar}>
              <DropdownItem>
                <h1 className="menuButton">👽 outro cuteness</h1>
              </DropdownItem>
            </Link>
            <Link to="/homaremenon" onClick={this.toggleNavbar}>
              <DropdownItem>
                <h1 className="menuButton">🦞 homaremenon</h1>
              </DropdownItem>
            </Link>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}
