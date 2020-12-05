import React, { FC } from "react"; 
import styled from "styled-components";

import { BulkGame } from "api/src"; 

export interface Props { 
    game: BulkGame; 
}

const Card = styled.div`
    border: 1px solid #CDCDCD; 
    margin-top: 20px;
`

export const GameCard: FC<Props> = ({ game }) => ( 
    <Card>
        <span>Name: {game.names.international}</span>
        <br />
        <span>Id: {game.id}</span>
    </Card> 
) 