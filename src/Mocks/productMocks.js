import faker from "faker";
import MemoryContainer from "../Container/memoryContainer.js";

export default class ProductManager extends MemoryContainer {
    constructor() {
        super();
    }
    createProducts = (cant) => {
        const nuevos = [];
        for (let i = 0; i < cant; i++) {
            nuevos.push({
                name: faker.commerce.product(),
                price: faker.commerce.price(50, 200),
                img: faker.image.avatar()
            })
        }
        this.products = [...this.products, ...nuevos];
        return nuevos;
    }
}