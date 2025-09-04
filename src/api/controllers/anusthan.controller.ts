import { Request, Response } from 'express';
import Anusthan from '../../models/anusthan.model';

export const getAnusthans = async (req: Request, res: Response) => {
  try {
    const anusthans = await Anusthan.find();
    res.json(anusthans);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnusthan = async (req: Request, res: Response) => {
  try {
    const anusthan = await Anusthan.findById(req.params.id);
    if (!anusthan) return res.status(404).json({ message: 'Anusthan not found' });
    res.json(anusthan);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createAnusthan = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  const newAnusthan = new Anusthan({ name, description, price });

  try {
    const savedAnusthan = await newAnusthan.save();
    res.status(201).json(savedAnusthan);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAnusthan = async (req: Request, res: Response) => {
  try {
    const updatedAnusthan = await Anusthan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAnusthan) return res.status(404).json({ message: 'Anusthan not found' });
    res.json(updatedAnusthan);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAnusthan = async (req: Request, res: Response) => {
  try {
    const deletedAnusthan = await Anusthan.findByIdAndDelete(req.params.id);
    if (!deletedAnusthan) return res.status(404).json({ message: 'Anusthan not found' });
    res.json({ message: 'Anusthan deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
