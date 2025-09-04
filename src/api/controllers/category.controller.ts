
import { Request, Response } from 'express';
import { Category } from '../../models/category.model';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err: any) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ msg: 'An internal server error occurred while fetching categories.', error: err.message });
  }
};

export const deleteCategoryByName = async (req: Request, res: Response) => {
    try {
        const category = await Category.findOneAndDelete({ name: req.params.categoryName });
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.status(200).json({ msg: 'Category removed' });
    } catch (err: any) {
        res.status(500).json({ msg: err.message });
    }
};
