import CreateProductUsecase from "./create.product.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const repository = MockRepository();
        const productUsecase = new CreateProductUsecase(repository);
        const input = {
            name: "Celular",
            price: 10.0
        };

        const output = await productUsecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should thrown an error when name is missing", async () => {
        const mockRepository = MockRepository();
        const usecase = new CreateProductUsecase(mockRepository);
        const input = {
            name: "",
            price: 10.0
        };

        await expect(usecase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should thrown an error when price is negative", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateProductUsecase(customerRepository);
        const input = {
            name: "Celular",
            price: -1
        };

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );
    });
});

