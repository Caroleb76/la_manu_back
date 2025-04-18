import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "IFEN API",
            version: "1.0.0",
        },
        servers:[
            {
                url:"/api/v1"
            }
        ]
    },
    apis: ["./src/controllers/*/index.js",'./docs/schemas/*.yaml',],

}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;