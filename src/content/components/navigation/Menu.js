import React, { Component } from "react";
import { Collapse, Nav, NavItem, Button } from "reactstrap";

import { Link } from "react-router-dom";

var navHashtags = Array(
  "NAVIGATE",
  "EXTRAPOLATE",
  "MANIPULATE",
  "DISORIENTATE",
  'DISSIMULATE',
  'STIMULATE',
  'SIMULATE',
  'ASSIMILATE',
  'ALIENATE',
  'MEDITATE',
  'LACERATE',
  'INCUBATE',
  'REGULATE',
  'TERMINATE',
  'ACCELERATE',
  'ANTICIPATE',
  'INFATUATE',
  'INTOXICATE',
  'TESSELATE'
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
      margin: "2%",
      // width: "35%",
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
      <div style={littleInline}>
        <Button
          style={littleOverride}
          onClick={this.toggleNavbar}
          outline
          color="secondary"
        >
          {navHashtag}
        </Button>
        {/* </NavbarToggler> */}
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link to="/blog/" onClick={this.toggleNavbar}>
                <h1 className="menuButton">👾 blog</h1>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/entity/" onClick={this.toggleNavbar}>
                <h1 className="menuButton">🔮 die Entität</h1>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/manifesto/" onClick={this.toggleNavbar}>
                <h1 className="menuButton">✨ manifesto</h1>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/outrocuteness" onClick={this.toggleNavbar}>
                <h1 className="menuButton">🏧 outro cuteness</h1>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/homaremenon" onClick={this.toggleNavbar}>
                <h1 className="menuButton">🏩 homaremenon</h1>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    );
  }
}
