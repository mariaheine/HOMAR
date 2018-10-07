import React, { Component } from "react";

import outroproducts from "./../../../articles/products/outrocuteness.json";

export default class OutroProduct extends Component {
  render() {
    console.log("=======================================");
    console.log("ss: ", this.props.match.params.productId);
    console.log("=======================================");

    var id = this.props.match.params.productId;

    var product = outroproducts.products.find(x => x.id == `${id}`);

    var paragraphs = product.description.map(x => <p className="flex-item outro">{x}</p>);

    var imageSrc = `https://s3.eu-central-1.amazonaws.com/homar/outrocuteness/mem${id}.jpg`;

    return (
      <div className="flex-container outro">
        <img className="flex-item outro image" src={imageSrc} />
        <div className="flex-item outro">{paragraphs}</div>
      </div>
    );
  }
}
