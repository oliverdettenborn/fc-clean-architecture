import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUsecase from "./create.product.usecase";

describe("Test create product use case", () => {
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

    it("should create a product", async () => {
        const repository = new ProductRepository();
        const usecase = new CreateProductUsecase(repository);
        const input = {
            name: "Celular",
            price: 10.0
        };

        const result = await usecase.execute(input);

        expect(result.id).toBeDefined();

        const db = await repository.find(result.id);

        expect(db).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.price).toEqual(input.price);
    });
});
