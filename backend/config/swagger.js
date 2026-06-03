import swaggerJSDoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BLOG WEB API",
      version: "1.0.0",
      description: "API documentation for my Node.js project",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
 apis: ["./src/routes/**/*.js"],
  
}

const swaggerSpec = swaggerJSDoc(options)
console.log(swaggerSpec.paths)

export default swaggerSpec