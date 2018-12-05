import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Shop from "./components/shop/Shop";
import AppMobile from "./AppMobile";
import AppDesktop from "./AppDesktop";
import OutroCuteness from "./components/shop/OutroCuteness";
import OutroProduct from "./components/shop/OutroProduct";
import TheBlog from './components/blog/TheBlog';
import BlogPost from './components/blog/BlogPost';
import CreatePost from './components/dashboard/CreatePost';
import Homaremenon from './components/dashboard/Homaremenon';

const BaseRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/manifesto" component={AppMobile} />
        <Route path="/shop" component={Shop} />
        <Route exact path="/outrocuteness/" component={OutroCuteness} />
        <Route path="/outrocuteness/:productId" component={OutroProduct} />
        <Route exact path="/warp" component={AppDesktop} />
        <Route exact path="/blog/" component={TheBlog} />
        <Route path="/blog/:postId" component={BlogPost} />
        <Route path="/create" component={CreatePost} />
        <Route path="/homaremenon" component={Homaremenon} />
        <Route component={Asd} />
      </Switch>
    </div>
  );
};

export default BaseRouter;

const Asd = () => {
  return (
    <div>
      <p>404</p>
    </div>
  );
};
