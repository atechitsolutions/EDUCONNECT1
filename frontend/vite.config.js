import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const frontendRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
    build: {
        rolldownOptions: {
            input: {
                main: resolve(frontendRoot, "index.html"),
                "study-abroad/index": resolve(
                    frontendRoot,
                    "study-abroad/index.html"
                ),
                "online-education/index": resolve(
                    frontendRoot,
                    "online-education/index.html"
                )
            }
        }
    }
});
