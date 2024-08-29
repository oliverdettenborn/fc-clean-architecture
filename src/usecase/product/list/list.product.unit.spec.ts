import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListProductUsecase from "./list.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

const product1 = ProductFactory.create(
    "a",
    "Celular",
    10
);

const product2 = ProductFactory.create(
    "a",
    "Computador",
    1000
);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    };
};

describe("Unit test for listing product use case", () => {
    it("should list a products", async () => {
        const repository = MockRepository();
        const useCase = new ListProductUsecase(repository);

        const output = await useCase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products).toEqual([
            {id: product1.id, name: product1.name, price: product1.price},
            {id: product2.id, name: product2.name, price: product2.price},
        ]);
    });
});
