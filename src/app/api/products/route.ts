import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Product from "@/models/product";

export const GET = async () => {
  try {
    await connect();
    const products = await Product.find();
    return NextResponse.json({
      statusbar: "success",
      message: "Data fetched successfully",
      data: products,
    });
  } catch (error) {}
};

export const POST = async (req: NextRequest) => {
  try {
    await connect();

    const productData = await req.json();
    const { name, description, price, image, category } = productData;

    const isExist = await Product.findOne({name});    
    if (isExist) {
        throw new Error(`Product ${name} already exists`);
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      image,
      category,
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Product created successfully",
        data: newProduct,
      },
      { status: 201, statusText: "CREATED" }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Something went wrong",
        error: (error as Error).message,
      },
      { status: 400, statusText: "FAILED" }
    );
  }
};
