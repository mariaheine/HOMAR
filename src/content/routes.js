import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Shop from "./components/shop/Shop";
import Manifesto from "./components/manifesto/Manifesto";
import UnityContainer from "./components/unity/UnityContainer";
import OutroCuteness from "./components/shop/OutroCuteness";
import OutroProduct from "./components/shop/OutroProduct";
import TheBlog from './components/blog/TheBlog';
import BlogPost from './components/blog/BlogPost';

import Dashboard from './components/dashboard/Dashboard';
import EditPost from './components/dashboard/postEditing/EditPost';
import CreatePost from './components/dashboard/postEditing/CreatePost';
import SignIn from './components/dashboard/authentication/SignIn';
import SignUp from './components/dashboard/authentication/SignUp';
import EditUser from './components/dashboard/authentication/EditUser';
import AdminPanel from './components/dashboard/authentication/AdminPanel';
import PrivacyPolicy from "./components/legal/PrivacyPolicy";

const BaseRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/manifesto" component={Manifesto} />
        <Route path="/shop" component={Shop} />
        <Route exact path="/outrocuteness/" component={OutroCuteness} />
        <Route path="/outrocuteness/:productId" component={OutroProduct} />
        <Route exact path="/entity" component={UnityContainer} />

        <Route exact path="/blog/" component={TheBlog} />
        <Route path="/blog/:postId" component={BlogPost} />

        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/homaremenon/" component={Dashboard} />        
        <Route path="/homaremenon/edit/:postId" component={EditPost} />
        <Route path="/create" component={CreatePost} />
        <Route path="/editUser" component={EditUser} />
        <Route path="/adminPanel" component={AdminPanel} />
        <Route path="/privacy" component={PrivacyPolicy} />

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
