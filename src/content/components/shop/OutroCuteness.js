import React, { Component } from "react";
import { NavLink } from "reactstrap";

import outroproducts from "./../../../articles/products/outrocuteness.json";

var tmpImg =
  "https://s3.eu-central-1.amazonaws.com/homar/outrocuteness/mem1.jpg";

export default class OutroCuteness extends Component {
  render() {

    var finalprofucts = outroproducts.products.map(x => (
      <CuteProduct id={x.id} imgSrc={x.memId} />
    ));

    var listedProducts = finalprofucts.map(x => (
      <li className="flex-item">{x}</li>
    ));

    return (
      <div className="content">
        <div className="productHeader" >
          <h1 className="productHeader">Outro Cuteness</h1>
        </div>
        <ul className="flex-container">{listedProducts}</ul>
      </div>
    );
  }
}

const CuteProduct = props => {

  let imgSrc = `https://s3.eu-central-1.amazonaws.com/homar/outrocuteness/meme${props.imgSrc}.jpg`;

  return (
    <NavLink href={`#/outrocuteness/${props.id}`}>
      <div className="listedOutro">
        {/* {props.id} */}
        <img className="listedOutro" alt="" src={imgSrc} />
      </div>
    </NavLink>
  );
};
