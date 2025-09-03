
import { Request, Response } from 'express';
import { User } from '../../models/user.model';

export const makeAdmin = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.role = 'Admin';
    await user.save();

    res.json({ msg: 'User is now an admin' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
