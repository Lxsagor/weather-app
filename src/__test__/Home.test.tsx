import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "../components/Home";

test("should render home", () => {
    render(<Home />);
    const linkElement = screen.getByTestId("home");
    expect(linkElement).toBeInTheDocument();
});
