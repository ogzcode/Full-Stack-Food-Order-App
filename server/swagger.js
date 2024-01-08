export const swagger = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Food Delivery API with Swagger",
            version: "0.1.0",
            description:
                "REST API of Food-ER application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Oğuzhan Güç",
                url: "https://github.com/ogzcode",
                email: "oguzguc44@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        tags: [
            {
                name: "Auth",
                description: "Authentication related endpoints",
            },
            {
                name: "Users",
                description: "User related endpoints",
            },
            {
                name: "Products",
                description: "Product related endpoints",
            },
            {
                name: "Orders",
                description: "Order related endpoints",
            },
            {
                name: "Comments",
                description: "Comment related endpoints",
            },
        ],
    },
    apis: ["./controller/*.js"],
};