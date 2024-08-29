import {InputListProductDto, OutputListProductDto,} from "./list.product.dto";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {ProductMapper} from "./product.mapper";

export default class ListProductUsecase {
  private repository: ProductRepositoryInterface;
  constructor(repository: ProductRepositoryInterface) {
    this.repository = repository;
  }

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const customers = await this.repository.findAll();
    return ProductMapper.toOutput(customers);
  }
}

