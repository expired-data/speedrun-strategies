import React, { FC } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { NotFound } from "./NotFound";
import { GamesList } from "./GameList";
import { Game } from "./Game";
import { Run } from "./Run";

export const Routes: FC = () => (
  <Router>
    <Switch>
      <Route component={GamesList} path="/games" exact />
      <Route component={Game} path="/game/:id" />
      <Route component={Run} path="/run/:id" />
      <Route component={NotFound} /> {/* default route to always match */}
    </Switch>
  </Router>
);
