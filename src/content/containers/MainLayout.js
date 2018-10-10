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
import Menu from "../components/Menu";

import "bootstrap/dist/css/bootstrap.css";
import "./../../styles/mobileStyles.css";

import HomarImage from "./../../styles/assets/homarFlat.jpg";
import Homar from "./../../styles/assets/homar-ruch.gif";

var navbarStyle = {
  // backgroundImage: `url(${HomarImage})`,
  // background: 'rgb(255, 77, 145)'
  // background: 'black'
  // background: 'white'
};

var navbarHomeLinkStyle = {};

export class MainLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "0",
      isHomarUnleashed: true
    };
  }

  triggerHomar = () => {
    if (this.state.isHomarUnleashed === true) {
      document.getElementById("jumpyHomar").style.WebkitAnimationPlayState =
        "paused";
    } else {
      document.getElementById("jumpyHomar").style.WebkitAnimationPlayState =
        "running";
    }
    this.setState({ isHomarUnleashed: !this.state.isHomarUnleashed });
  };

  render() {
    return (
      <div className="mainNavbar">
        <Navbar style={navbarStyle}>
              <NavbarBrand href="/#">
                <h1 className="title logo">HOMAR</h1>
              </NavbarBrand>
              <img
                id="jumpyHomar"
                onClick={this.triggerHomar}
                src={Homar}
                className="homar"
              />
              <Menu />
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
