import { render, screen } from "@testing-library/react";
import { Button } from "./components/Button";

test("Button visibility", () => {
  render(<Button text="Hello" />);
  const button = screen.getByText(/Hello/i);
  expect(button).toBeVisible();
  expect(button).toHaveClass("button");
});
