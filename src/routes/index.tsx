import React, { FC } from "react"; 
import {
    BrowserRouter as Router,
    Switch, 
    Route
} from "react-router-dom";
import { NotFound } from "./NotFound"; 

export const Routes: FC<{}> = () => ( 
    <Router> 
        <Switch> 
            <Route component={NotFound} /> {/* default route to always match */}
        </Switch> 
    </Router> 
)