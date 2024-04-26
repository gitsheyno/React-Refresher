import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Pet from "../Pet";
import { StaticRouter } from "react-router-dom/server";

test("display default thumbnail", async () => {
  const pet = render(
    <StaticRouter>
      <Pet />
    </StaticRouter>
  );
  const petThumbnail = await pet.findByTestId("thumbnail");

  expect(petThumbnail.src).toContain("none.jpg");
  pet.unmount();
});

test("displays a none-default thumbnail", async () => {
  const pet = render(
    <StaticRouter>
      <Pet images={["1.jpg", ["2.jpg"]]} />
    </StaticRouter>
  );
  const petThumbnail = await pet.findByTestId("thumbnail");

  expect(petThumbnail.src).toContain("1.jpg");
  pet.unmount();
});
