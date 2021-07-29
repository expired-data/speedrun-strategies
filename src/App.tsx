import React, { FC } from "react";
import { Routes } from "./routes";
import { PageWrapper } from "./PageWrapper";

export const App: FC = () => (
  <PageWrapper>
    <Routes />
  </PageWrapper>
);
