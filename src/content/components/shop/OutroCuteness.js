import React, { Component } from "react";
import {
  NavLink
} from "reactstrap";

import outroproducts from "./../../../articles/products/outrocuteness.json";

// var products = JSON.parse(outroproducts);

export default class OutroCuteness extends Component {
  render() {

    var finalprofucts = outroproducts.products.map(x => (
        <CuteProduct id={x.id} />
    ));
    
    var listedProducts = finalprofucts.map(x => (        
        <li className="flex-item">{x}</li>
    ))
    
    return (
      <div className="content">
        <h1>OUTRO CUTENESS</h1>
        <ul className="flex-container">
            {listedProducts}
        </ul>
      </div>
    );
  }
}

const CuteProduct = (props) => {
    return (
        <NavLink href={`#/outrocuteness/${props.id}`} >
            {props.id}
            {/* <p>{outroproducts.products[props.id].memeSrc}</p> */}
        </NavLink>
    )
}
