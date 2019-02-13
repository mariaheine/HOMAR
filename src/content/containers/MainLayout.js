import React, { Component } from "react";
import { TabContent, TabPane, Row, Col, Navbar } from "reactstrap";
import Menu from "../components/navigation/Menu";
import LanguageSelection from "../components/navigation/LanguageSelection";

import "bootstrap/dist/css/bootstrap.css";
import "./../../styles/mainStyles.css";

import Homar from "./../../styles/assets/homar-ruch.gif";

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
        <Navbar>
          <LanguageSelection />
          <Menu />
          <img
            alt="jumpy hooomar"
            id="jumpyHomar"
            onClick={this.triggerHomar}
            src={Homar}
            className="homar"
          />
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
