import {Sequelize} from "sequelize-typescript";
import FindProductUsecase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

describe("Test find product use case", () => {
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
        const usecase = new FindProductUsecase(repository);

        const product = new Product("123", "Celular", 10);

        await repository.create(product);

        const input = {
            id: "123",
        };

        const output = {
            id: "123",
            name: "Celular",
            price: 10
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
});
