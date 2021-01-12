import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NotFound } from "./NotFound";
import { GamesList } from "./GameList";
import { Game } from "./Game";

export const Routes: FC = () => (
  <Router>
    <Switch>
      <Route component={GamesList} path="/games" exact />
      <Route component={Game} path="/game/:id" />
      <Route component={NotFound} /> {/* default route to always match */}
    </Switch>
  </Router>
);
