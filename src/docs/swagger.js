import swaggerJSDoc from "swagger-jsdoc";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import yaml from "yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let schemas = {};
fs.readdirSync(path.join(__dirname, "../components/schemas")).forEach(
  (file) => {
    if (file.endsWith(".yaml")) {
      const schema = yaml.parse(
        fs.readFileSync(
          path.join(__dirname, "../components/schemas", file),
          "utf8"
        )
      );
      const schemaRootName = file.replace(".yaml", "");
      schemas[schemaRootName] = schema[schemaRootName];
    }
  }
);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IFEN API",
      version: "1.0.0",
    },
    components: {
      schemas,
    },
    servers: [
      {
        url: "/api/v1",
      },
    ],
  },
  apis: ["./src/controllers/*/index.js", "./docs/schemas/*.yaml"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
