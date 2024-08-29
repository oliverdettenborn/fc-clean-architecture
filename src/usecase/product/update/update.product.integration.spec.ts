import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUsecase from "../find/find.product.usecase";
import Product from "../../../domain/product/entity/product";
import UpdateProductUsecase from "./update.product.usecase";

describe("Test update product use case", () => {
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
        const usecase = new UpdateProductUsecase(repository);

        const product = new Product("123", "Celular", 10);

        await repository.create(product);

        const input = {
            id: "123",
            name: "Celular mais caro",
            price: 100
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(input);
    });
});
