import {app, sequelize} from "../express";
import request from "supertest";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Celular",
                price: 10
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: expect.any(String),
            name: "Celular",
            price: 10
        })
    });

    it("should not create a product", async () => {
        const response = await request(app).post("/product").send({
            name: "Celular",
            price: -10
        });
        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        const repository = new ProductRepository();

        const product1 = new Product("123", "Celular", 10);
        const product2 = new Product("456", "PC", 1000);

        await repository.create(product1);
        await repository.create(product2);

        const listResponse = await request(app).get("/product").send();

        expect(listResponse.status).toBe(200);

        expect(listResponse.body.products.length).toBe(2);
        expect(listResponse.body.products).toEqual([
            {id: "123", name: "Celular", price: 10},
            {id: "456", name: "PC", price: 1000},
        ])
    });
});
