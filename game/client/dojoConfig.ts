import { createDojoConfig } from "@dojoengine/core";

import manifest from "../dojo/manifest_dev.json";

export const dojoConfig = createDojoConfig({
    manifest,
});
