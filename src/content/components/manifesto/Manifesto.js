import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  TabContent,
  TabPane,
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import "./../../../styles/components/manifesto.css";

import manifest from "./manifest.json";

class Manifesto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      activeParagraph: "0"
    };
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  toggleParagraph = paragraph => {
    if (this.state.activeParagraph !== paragraph) {
      this.setState({
        activeParagraph: paragraph
      });
    }
  };

  render() {
    const { language } = this.props;

    switch (language) {
      case "en":
        var titleText = "Xeno-sexuality arrives from the future. Manifesto.";
        break;
      default:
        var titleText = "Manifest: Xeno-seksualność nadchodzi z przyszłości";
        break;
    }

    // 1. Prepare paragraph links using id and title
    var paragraphLinks = manifest.articleParts.map(x => (
      <NavItem key={x.id} className="parahraphLink">
        <NavLink
          onClick={() => {
            this.toggleParagraph(x.id);
            this.toggleNavbar();
          }}
          className="parahraphLink"
        >
          <p className="paragraphLink">{x.title}</p>
        </NavLink>
      </NavItem>
    ));

    // 2. map every article part to an array containing all its paragraphs and default tab view elements (main button, prev, next)
    var paragraphContent = manifest.articleParts.map(x => (
      <div className="cont">
        <div className="tabHeader">
          <button
            onClick={() => {
              this.toggleNavbar();
            }}
            className="tabButton titleButton"
          >
            {x.title}
          </button>
          <PageRoller
            activeParagraph={this.state.activeParagraph}
            switchPage={this.toggleParagraph}
          />
        </div>
        <div className="manifestContent">
          {x.paragraphs
            .find(x => x.language === language)
            .content.map((z, j) => (
              <p key={`p${j}`} className="paragraphContent">
                {z}
              </p>
            ))}
        </div>
      </div>
    ));

    var paragraphTabs = paragraphContent.map((x, i) => (
      <TabPane key={i} tabId={`${i + 1}`}>
        <Row>
          <Col>{x}</Col>
        </Row>
      </TabPane>
    ));

    return (
      <div className="manifesto container">
        <Navbar color="faded" light className="manifesto">
          <NavbarToggler onClick={this.toggleNavbar} className="manifestHeader">
            <h1 className="manifesto title">{titleText}</h1>
          </NavbarToggler>
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <div className="paragraphLinks">{paragraphLinks}</div>
            </Nav>
          </Collapse>
        </Navbar>
        <TabContent activeTab={this.state.activeParagraph}>
          {paragraphTabs}
        </TabContent>
      </div>
    );
  }
}

class PageRoller extends React.Component {
  toggleParagraph(number) {
    this.props.switchPage(number.toString());
  }

  render() {
    var pageNumber = parseInt(this.props.activeParagraph);

    if (pageNumber > 1 && pageNumber < 11) {
      return (
        <div>
          <button
            className="tabButton pageflip"
            onClick={() => {
              this.toggleParagraph(pageNumber - 1);
            }}
          >
            Previous
          </button>
          <button
            className="tabButton pageflip"
            onClick={() => {
              this.toggleParagraph(pageNumber + 1);
            }}
          >
            Next
          </button>
        </div>
      );
    } else if (pageNumber === 1) {
      return (
        <div>
          <button
            className="tabButton pageflip"
            onClick={() => {
              this.toggleParagraph(pageNumber + 1);
            }}
          >
            Next
          </button>
        </div>
      );
    } else if (pageNumber === 11) {
      return (
        <div>
          <button
            className="tabButton pageflip"
            onClick={() => {
              this.toggleParagraph(pageNumber - 1);
            }}
          >
            Previous
          </button>
        </div>
      );
    } else return <div>yo</div>;
  }
}

const mapStateToProps = state => {
  return {
    language: state.language.selectedLanguage
  };
};

export default compose(connect(mapStateToProps))(Manifesto);
