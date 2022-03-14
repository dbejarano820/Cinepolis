import { Item, ItemModel } from '../models/item';

export class item_data {
    public constructor() {

    }
    public create(data: any) {
        const newItem = new ItemModel(data);
        return newItem.save();
    }

    public list() {
        return ItemModel.find({}, {"_id":0, "sizes":0,"colors":0,"material":0,"quantity":0,"shippingPrice":0,"__v":0, "reviews":0});
    }

    public info(data: any) {   // se espera el nombre del articulo y nombre de la tienda
        console.log(data)
        return ItemModel.find(data);
    }

    public review(itemInfo: any, data: any) {   // se espera el nombre del articulo y nombre de la tienda
        return ItemModel.updateOne(itemInfo, {"$push" : {"reviews" : data}, "$inc": {"reviewQuantity": 1}});
    }

}

