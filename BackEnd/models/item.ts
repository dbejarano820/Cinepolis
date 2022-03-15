import * as mongoose from 'mongoose'

interface Item {
    name: string,
    store: string,
    description: string,
    sizes: [string],
    colors: [string],
    material: string,
    quantity: number,
    price: number,
    pictures: [string],
    reviewQuantity: number,
    shippingPrice: number,
    reviews :
    [{
      firstname: string,
      lastname: string,
      timestamp: Date,
      rating: number,
      comment: string
    }]
}


const itemSchema = new mongoose.Schema<Item>({
    name: String,
    store: String,
    description: String,
    sizes: [String],
    colors: [String],
    material: String,
    quantity: Number,
    price: Number,
    pictures: [String],
    reviewQuantity: Number,
    shippingPrice: Number,
    reviews :
    [{
      firstname: String,
      lastname: String,
      timestamp: Date,
      rating: Number,
      comment: String
    }]
})

const ItemModel = mongoose.model<Item>("Item", itemSchema);
export { ItemModel, Item }