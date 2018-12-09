import React, { Component } from "react";
import { NavLink } from "reactstrap";

import outroproducts from "./../../../articles/products/outrocuteness.json";

export default class OutroProduct extends Component {
  render() {
    var id = this.props.match.params.productId;

    var product = outroproducts.products.find(x => x.id === `${id}`);

    // OLD:
    // var paragraphs = product.description.map(x => <p>{x}</p>);
    // NEW: Why is id "dangerous"?
    var paragraphs = product.description.map(x => (
      <p dangerouslySetInnerHTML={{ __html: `${x}` }} />
    ));

    // var header = product.header.map(x => <p className="flex-item outro">{x}</p>);
    var header = (
      <NavLink href="#/outrocuteness">
        <p
          id="outroHeader"
          dangerouslySetInnerHTML={{ __html: `${product.header}` }}
        />
      </NavLink>
    );

    let memeId = product.memId;
    var imageSrc = `https://s3.eu-central-1.amazonaws.com/homar/outrocuteness/meme${memeId}.jpg`;

    return (
      <div className="flex-container outro">
        <div className="flex-item outro">
          {header}
          <img className="flex-item outro" src={imageSrc} />
        </div>
        <div id="outroDescription" className="flex-item outro">
          {paragraphs}
          <NavLink className="" href="#/outrocuteness">
            Back to shop
          </NavLink>
          <NavLink className="" href="#/">
            Buy
          </NavLink>
        </div>
      </div>
    );
  }
}
