import React from "react"; 
import { render } from "@testing-library/react";
import { NotFound } from "../NotFound"; 

test("NotFound page renders as expected", () => { 
    const { container } = render(<NotFound />)
    expect(container.innerHTML).toMatchSnapshot();
}); 