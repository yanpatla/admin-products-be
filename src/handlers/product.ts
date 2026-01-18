import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "availability"] },
    });
    res.json({ data: products });
  } catch (error) {
    console.log(error);
  }
};
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(Number(id));

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.json({
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(Number(id));

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.update(req.body);
    await product.save();
    res.json({
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateAviability = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(Number(id));

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.update(req.body);
    await product.save();
    res.json({
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(Number(id));

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.destroy();
    res.json({ data: "Product deleted" });
  } catch (error) {
    console.log(error);
  }
};
