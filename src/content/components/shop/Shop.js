import React, { Component } from "react";
import {Link} from "react-router-dom";
import OutroCuteness from './OutroCuteness'

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


import "./../../../styles/shopStyles.css";

export default class Shop extends Component {
  render() {
    return (
      <div>
        <NavLink href="#/outrocuteness">Outro Cuteness</NavLink>
      </div>
    );
  }
}
