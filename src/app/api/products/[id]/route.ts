import connect from "@/lib/db";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    await connect();
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        {
          statusbar: "failed",
          message: "No Product Found",
          data: product,
        },
        { status: 404, statusText: "FAILED" }
      );
    }

    return NextResponse.json({
      statusbar: "success",
      message: "Data fetched successfully",
      data: product,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Something went wrong",
        error: (error as Error).message,
      },
      { status: 400, statusText: "FAILED" }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const productData = await request.json();
  const { name, description, price, image, category } = productData;

  try {
    await connect();

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        {
          statusbar: "failed",
          message: "No Product Found",
          data: product,
        },
        { status: 404, statusText: "FAILED" }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, image, category },
      {
        new: true,
        runValidators: true,
      }
    );
    return NextResponse.json({
      statusbar: "success",
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Something went wrong",
        error: (error as Error).message,
      },
      { status: 400, statusText: "FAILED" }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    await connect();
    
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        {
          statusbar: "failed",
          message: "No Product Found",
          data: product,
        },
        { status: 404, statusText: "FAILED" }
      );
    }

    await Product.findByIdAndDelete(id);
    return NextResponse.json({
      statusbar: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Something went wrong",
        error: (error as Error).message,
      },
      { status: 400, statusText: "FAILED" }
    );
  }
}
