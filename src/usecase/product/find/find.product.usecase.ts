import {
  InputFindProductDto,
  OutputFindProductDto,
} from "./find.product.dto";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

export default class FindProductUsecase {
  private repository: ProductRepositoryInterface;

  constructor(productRepositoryInterface: ProductRepositoryInterface) {
    this.repository = productRepositoryInterface;
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.repository.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price: product.price
    };
  }
}
