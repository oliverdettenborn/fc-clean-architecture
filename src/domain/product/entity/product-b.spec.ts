import ProductB from "./product-b";

describe("Product unit tests", () => {
    it("should return error when id is empty", () => {
        const product = new ProductB("", "Product 1", 100);

        expect(product.notification.messages("product")).toBe(
            "product: Id is required,"
        );
    });

    it("should return error when name is empty", () => {
        const product = new ProductB("123", "", 100);

        expect(product.notification.messages("product")).toBe(
            "product: Name is required,"
        );
    });

    it("should return error when price is less than zero", () => {
        const product = new ProductB("123", "Name", -1);

        expect(product.notification.messages("product")).toBe(
            "product: Price must be greater than zero,"
        );
    });

    it("should return error when price is less than zero and name is empty", () => {
        const product = new ProductB("123", "", -1);

        expect(product.notification.messages("product")).toBe(
            "product: Name is required,product: Price must be greater than zero,"
        );
    });

    it("should change name", () => {
        const product = new ProductB("123", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should change price", () => {
        const product = new ProductB("123", "Product 1", 100);
        product.changePrice(150);
        expect(product.price).toBe(300);
    });
});