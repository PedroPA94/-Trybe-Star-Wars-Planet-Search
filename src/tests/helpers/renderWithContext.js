import { render } from "@testing-library/react";
import React from "react";
import PlanetsProvider from "../../context/PlanetsProvider";

export function renderWithContext(component) {
  return(
    render(
      <PlanetsProvider>
        {component}
      </PlanetsProvider>
    )
  )
}