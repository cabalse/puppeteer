import { createServer, Response } from "miragejs";
import Product from "../models/product";

const mirageServer = () => {
  const data: Product[] = [
    { productnumber: "1AB3", name: "Product Number One" },
    { productnumber: "KZ34YT", name: "Product Number TWO" },
  ];

  createServer({
    routes() {
      this.get("/api/products", () => ({
        products: data,
      }));
      this.post("/api/products", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const newProduct = {
          productnumber: attrs.productnumber,
          name: attrs.name,
        };
        data.push(newProduct);
        return new Response(200, {}, { product: newProduct });
      });
    },
  });
};

export default mirageServer;
