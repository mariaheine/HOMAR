import React, { Component } from "react";
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

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleParagraph = this.toggleParagraph.bind(this);

    this.state = {
      collapsed: false,
      activeParagraph: "0",
      language: "pl"
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggleParagraph(paragraph) {
    if (this.state.activeParagraph !== paragraph) {
      this.setState({
        activeParagraph: paragraph
      });
    }
  }

  render() {
    // console.log(manifest.articleParts[0].paragraphs.find(x => x.language == this.state.language));

    // 1. Prepare paragraph links using id and title
    var paragraphLinks = manifest.articleParts.map(x => (
      <NavItem key={x.id}>
        <NavLink
          id="tst"
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

    // map every article part to an array containing all its paragraphs and default tab view elements (main button, prev, next)
    var paragraphContent = manifest.articleParts.map(x => (
      <div className="content">
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
        <div className="manifest content">
          {x.paragraphs
            .find(x => x.language === this.state.language)
            .content.map((z, j) => (
              <p key={`p${j}`} className="content">
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
            <h1 className="manifesto title">
              Manifest: Xeno-seksualność nadchodzi z przyszłości
            </h1>
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

// const Paragraph0 = (
//   <div className="content">
//     <h1 className="content vert-centered"> o.0 </h1>
//   </div>
// );

export default Manifesto;
