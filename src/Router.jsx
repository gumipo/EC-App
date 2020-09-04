import React from "react";
import Auth from "./Auth";
import { Route, Switch } from "react-router";
import { SignIn, Home, SignUp, Reset, ProductEdit } from "./Templates/index";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signin/reset"} component={Reset} />

      <Auth>
        <Route exact path={"(/)?"} component={Home} />
        <Route path={"/product/edit(/:id)?"} component={ProductEdit} />
      </Auth>
    </Switch>
  );
};
export default Router;
