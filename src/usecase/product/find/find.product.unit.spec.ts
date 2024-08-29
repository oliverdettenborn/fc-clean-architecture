import FindProductUsecase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

const product = new Product("123", "Celular", 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const repository = MockRepository();
    const usecase = new FindProductUsecase(repository);

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

  it("should not find a product", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new FindProductUsecase(customerRepository);

    const input = {
      id: "123",
    };

    await expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
