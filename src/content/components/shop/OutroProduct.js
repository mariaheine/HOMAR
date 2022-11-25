import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import outroproducts from "./products/outrocuteness.json";

import { outroMemeArray } from "./OutroCutenessImages";

export default class OutroProduct extends Component {
  render() {
    var id = this.props.match.params.productId;

    var product = outroproducts.products.find(x => x.id === `${id}`);

    // OLD:
    // var paragraphs = product.description.map(x => <p>{x}</p>);
    // NEW: Why is id "dangerous"?
    var paragraphs = product.description.map((x, index) => (
      <p key={index} dangerouslySetInnerHTML={{ __html: `${x}` }} />
    ));

    // var header = product.header.map(x => <p className="flex-item outro">{x}</p>);
    var header = (
      <Link to="/outrocuteness">
        <p
          id="outroHeader"
          dangerouslySetInnerHTML={{ __html: `${product.header}` }}
        />
      </Link>
    );

    let memeId = product.memId;

    return (
      <div className="flex-container outro">
        <div className="flex-item outro">
          {header}
          <img alt="outro product" className="flex-item outro" src={outroMemeArray[id]} />
        </div>
        <div id="outroDescription" className="flex-item outro">
          {paragraphs}
          <Button id="submit1" color="info" onClick={this.props.history.goBack}>
            Go back
          </Button>
        </div>
      </div>
    );
  }
}
