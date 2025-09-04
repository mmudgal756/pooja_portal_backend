
import { Request, Response } from 'express';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};

const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findOne({ name: req.params.categoryName });
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    const products = await Product.find({ category: category._id });
    res.status(200).json(products);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(200).json({ msg: 'Product removed' });
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};

export { createProduct, getProducts, getProductById, getProductsByCategory, updateProduct, deleteProduct };
