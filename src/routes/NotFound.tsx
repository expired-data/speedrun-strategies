import React, { FC } from "react";
import styled from "styled-components";

const CenteredDiv = styled.div`
  margin: auto;
  width: 500px;
  margin-top: 20vh;
  text-align: center;
  font-size: 2rem;
`;

export const NotFound: FC<{}> = () => (
  <CenteredDiv>The page you are looking for does not exist (yet).</CenteredDiv>
);
