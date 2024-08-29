import UpdateProductUsecase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

const product = ProductFactory.create(
    "a",
    "Celular",
    10
);

const input = {
    id: product.id,
    name: "Celular Novo",
    price: 50
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
    };
};

describe("Unit test for product update use case", () => {
    it("should update a product", async () => {
        const repository = MockRepository();
        const usecase = new UpdateProductUsecase(repository);

        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    });
});
