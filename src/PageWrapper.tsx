import styled from "styled-components";
import React, { FC } from "react";

const Content = styled.div`
  margin: 30px 10vw 0;
  padding: 10px;
  background-color: #eee;
  overflow: auto;
`;

const TopBanner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 30px;
  width: 100%;
  background-color: #eee;
  padding-left: 10px;
  box-shadow: 0 4px 8px -1px #ccc;
`;

const CenteredText = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
`;

export const PageWrapper: FC<{}> = ({ children }) => (
  <>
    <TopBanner>
      <CenteredText>SRS</CenteredText>
    </TopBanner>{" "}
    {/* TODO replace with logo */}
    <Content>{children}</Content>
  </>
);
