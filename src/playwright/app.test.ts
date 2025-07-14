// @ts-check
import { expect, test } from "@playwright/test";

import { loadApp } from "./util";

test("has map-experiments title", async ({ page }) => {
  await loadApp(page);

  await expect(page).toHaveTitle(/map-experiments/i);
});
