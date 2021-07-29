import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://ruling-boa-15.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("app")
);
