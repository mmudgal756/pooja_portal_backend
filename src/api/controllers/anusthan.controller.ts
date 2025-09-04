import { Request, Response } from 'express';
import Anusthan from '../../models/anusthan.model';

export const createAnusthan = async (req: Request, res: Response) => {
  try {
    const anusthan = await Anusthan.create(req.body);
    res.status(201).json(anusthan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating anusthan' });
  }
};

export const getAnusthans = async (req: Request, res: Response) => {
  try {
    const anusthans = await Anusthan.find();
    res.status(200).json(anusthans);
  } catch (error) {
    res.status(500).json({ message: 'Error getting anusthans' });
  }
};

export const getAnusthan = async (req: Request, res: Response) => {
  try {
    const anusthan = await Anusthan.findById(req.params.id);
    if (!anusthan) {
      return res.status(404).json({ message: 'Anusthan not found' });
    }
    res.status(200).json(anusthan);
  } catch (error) {
    res.status(500).json({ message: 'Error getting anusthan' });
  }
};

export const updateAnusthan = async (req: Request, res: Response) => {
  try {
    const anusthan = await Anusthan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!anusthan) {
      return res.status(404).json({ message: 'Anusthan not found' });
    }
    res.status(200).json(anusthan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating anusthan' });
  }
};

export const deleteAnusthan = async (req: Request, res: Response) => {
  try {
    const anusthan = await Anusthan.findByIdAndDelete(req.params.id);
    if (!anusthan) {
      return res.status(404).json({ message: 'Anusthan not found' });
    }
    res.status(200).json({ message: 'Anusthan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting anusthan' });
  }
};
