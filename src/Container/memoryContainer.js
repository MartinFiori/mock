import faker from "faker";
const {
    datatype
} = faker;

export default class MemoryContainer {
    constructor() {
        this.products = [];
    }
    read = () => {
        return this.products;
    }
    readOne = (id) => {
        let product = this.products.find(prod => prod.id === id)
        return product ? product : null
    }
    create = (product) => {
        product.id = datatype.uuid();
        this.products.push(product);
        return product
    }
    update = (id, product) => {
        let index = this.products.findIndex(prod => prod.id === id);
        product.id = this.users[index].id;
        this.products[index] = product;
        return product
    }
    delete = (id) => {
        let index = this.products.filter(prod => prod.id !== id);
        this.products.push(index);
        return index
    }
}