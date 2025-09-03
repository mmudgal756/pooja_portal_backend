
import { Request, Response } from 'express';
import { Product } from '../../models/product.model';

interface AuthRequest extends Request {
  user?: any;
}

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = new Product({
      ...req.body,
      vendor: req.user.id
    });
    await product.save();
    res.status(201).json(product);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate('category').populate('vendor', 'name');
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate('category').populate('vendor', 'name');
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json({ msg: 'Product removed' });
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};
