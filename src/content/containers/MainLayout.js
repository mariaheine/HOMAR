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
import Menu from "../components/main/Menu";

import "./../../styles/mobileStyles.css";


import HomarImage from "./../../styles/assets/homarFull.jpg";

var navbarStyle = {
  backgroundImage:  `url(${HomarImage})`
};

export class MainLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "0"
    };
  }

  render() {
    return (
      <div className="mainNavbar">
        <Navbar style={navbarStyle}>
          <NavbarBrand href="/">
            <h1 className="title logo">HOMAR</h1>
          </NavbarBrand>
          <Menu/>
        </Navbar>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="0">
            <Row>
              <Col sm="12">{this.props.children}</Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default MainLayout;
