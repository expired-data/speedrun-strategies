import styled from "styled-components";
import React, { FC } from "react";

const Content = styled.div`
  padding: 3vw;
  background-color: "#EEEEEE";
`;

export const PageWrapper: FC<{}> = ({ children }) => (
  <>
    <Content>{children}</Content>
  </>
);
