// @ts-check
import { expect, test } from "@playwright/test";

import { loadApp } from "./util";

test("has react-leaflet-playground title", async ({ page }) => {
  await loadApp(page);

  await expect(page).toHaveTitle(/react-leaflet-playground/i);
});
