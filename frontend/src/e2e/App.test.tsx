import React from "react";
import { render, screen } from "@testing-library/react";
import { Common } from "../component/Common";
import { Home } from "../component/Home";

describe("レンダリングテスト", () => {
  test("renders learn react link", () => {
    render(
      <Common>
        <Home />
      </Common>
    );
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});
