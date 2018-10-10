    import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import "./../../styles/mobileStyles.css";


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
    return (
      <div>
        <NavbarToggler onClick={this.toggleNavbar}>
          <div className="menuButton">
            <p className="menuButton">{`# <- o.0`}</p>
          </div>
        </NavbarToggler>
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="#/manifesto/" onClick={this.toggleNavbar}>
                <h1 className="title menuButton">Manifesto</h1>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#/outrocuteness" onClick={this.toggleNavbar}>
                <h1 className="title menuButton">Shop [HOT!]</h1>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    );
  }
}
