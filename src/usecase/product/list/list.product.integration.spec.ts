import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUsecase from "./list.product.usecase";

describe("Test find products use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {
        const repository = new ProductRepository();
        const usecase = new ListProductUsecase(repository);

        const product1 = new Product("123", "Celular", 10);
        const product2 = new Product("456", "PC", 1000);

        await repository.create(product1);
        await repository.create(product2);

        const input = {};

        const result = await usecase.execute(input);

        expect(result.products).toEqual([
            {id: product1.id, name: product1.name, price: product1.price},
            {id: product2.id, name: product2.name, price: product2.price},
        ]);
    });
});
