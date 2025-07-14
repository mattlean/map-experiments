// @ts-check
import { expect, test } from "@playwright/test";

import { loadApp } from "./util";

test("has leaflet-playground title", async ({ page }) => {
  await loadApp(page);

  await expect(page).toHaveTitle(/leaflet-playground/i);
});
