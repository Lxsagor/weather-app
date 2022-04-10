import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "../components/Home";

test("Should render render home component", () => {
    render(<Home />);
    const linkElement = screen.getByTestId("home");
    expect(linkElement).toBeInTheDocument();
});
