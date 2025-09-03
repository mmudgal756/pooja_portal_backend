
import { check } from 'express-validator';

export const registerValidator = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
];

export const loginValidator = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];
