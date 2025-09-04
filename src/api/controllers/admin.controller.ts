
import { Request, Response } from 'express';
import { User } from '../../models/user.model';

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    if (!role) {
      return res.status(400).json({ msg: 'Role is required' });
    }

    const allowedRoles = ['Admin', 'Vendor', 'Customer'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ msg: 'Invalid role specified' });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Exclude password from the response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ msg: 'User role updated successfully', user: userResponse });
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};
