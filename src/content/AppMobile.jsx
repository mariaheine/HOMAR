import React, { Component } from "react";
import { TabContent, TabPane, Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import "./../styles/mobileStyles.css";

import manifest from '../articles/manifest.json';

// na razie nie uzywane, calosc jest w jednym komponencie, wiem ze syf ale nie ma czasu inaczej
import Manifest from "./mobile/Manifest";

class AppMobile extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleParagraph = this.toggleParagraph.bind(this);

    this.state = {
      collapsed: false,
      activeParagraph: '0',
      language: 'pl'
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
    var paragraphLinks = manifest.articleParts
      .map(x => 
        <NavItem key={x.id}>
          <NavLink onClick={() => { this.toggleParagraph(x.id); this.toggleNavbar() }}>
              <p className="title">{x.title}</p>
          </NavLink>
        </NavItem>
      );

    // map every article part to an array containing all its paragraphs and default tab view elements (main button, prev, next)
    var paragraphContent = manifest.articleParts
        .map(x => 
          <div>
            <div className="tabHeader">
                <button onClick={() => {this.toggleNavbar()}} className="tabButton titleButton">{x.title}</button>
                <PageRoller activeParagraph={this.state.activeParagraph} switchPage={this.toggleParagraph}/>
            </div>
            <div className="content">
              {
                x.paragraphs
                    .find(x => x.language === this.state.language)
                    .content.map((z, j) => 
                        <p key={`p${j}`} className="content">
                            {z}
                        </p>
                    )
              }
            </div>
          </div>
        );

    var paragraphTabs = paragraphContent
      .map((x, i) => 
        <TabPane key={i} tabId={`${i+1}`}>
          <Row>
            <Col sm="12">
              {x}
            </Col>
          </Row>
        </TabPane>
      );

    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">
            <h1>HOMAR</h1>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" >
            <h1 className="title">Manifest: Xeno-seksualność nadchodzi z przyszłości</h1>
          </NavbarToggler>
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              {paragraphLinks}
            </Nav>
          </Collapse>
        </Navbar>
        <TabContent activeTab={this.state.activeParagraph}>
          <TabPane tabId="0">
            <Row>
              <Col sm="12">
                {Paragraph0}
              </Col>
            </Row>
          </TabPane>
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

    if(pageNumber > 1 && pageNumber < 11) {
      return (
        <div>
          <button className="tabButton pageflip" onClick={() => {this.toggleParagraph(pageNumber-1)}}>Previous</button>
          <button className="tabButton pageflip" onClick={() => {this.toggleParagraph(pageNumber+1)}}>Next</button>
        </div>
      );
    }
    else if (pageNumber === 1) {
      return (
        <div>
          <button className="tabButton pageflip" onClick={() => {this.toggleParagraph(pageNumber+1)}}>Next</button>
        </div>
      );
    }
    else if (pageNumber === 11 ) {
      return (
        <div>
          <button className="tabButton pageflip" onClick={() => {this.toggleParagraph(pageNumber-1)}}>Previous</button>
        </div>
      );
    }
    else
     return <div>yo</div>;
  }
}

const Paragraph0 = 
<div className="content">
  <h1 className="content vert-centered">choose ur emoticons</h1>  
</div>

export default AppMobile;
