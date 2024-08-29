import express, {Request, Response} from "express";
import CreateProductUsecase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUsecase from "../../../usecase/product/list/list.product.usecase";

export const productRouter = express.Router();

productRouter.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateProductUsecase(new ProductRepository());
    try {
        const dto = {
            name: req.body.name,
            price: req.body.price,
        };
        const output = await usecase.execute(dto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRouter.get("/", async (req: Request, res: Response) => {
    const usecase = new ListProductUsecase(new ProductRepository());
    const output = await usecase.execute({});

    res.send(output);
});