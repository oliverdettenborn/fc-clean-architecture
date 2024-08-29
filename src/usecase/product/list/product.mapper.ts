import ProductInterface from "../../../domain/product/entity/product.interface";
import {OutputListProductDto} from "./list.product.dto";

export class ProductMapper {
    static toOutput(product: ProductInterface[]): OutputListProductDto {
        return {
            products: product.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price
            })),
        };
    }
}