import { model, models, Schema } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  ratingsAverage: number;
  ratingsQuantity:number;
  category: string;
  image: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "A product must have a description"],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    // toJSON: {
    //     versionKey: false,
    //     virtuals: true,
    //     transform: (_, ret) => {
    //         delete ret._id;
    //     },
    // },
  }
);
const Product = models.Product || model("Product", productSchema);
export default Product;
