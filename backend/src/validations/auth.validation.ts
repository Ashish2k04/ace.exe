import type {Request, Response, NextFunction} from 'express';
import {body, validationResult} from 'express-validator';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const validateLogin = [
  body('email').trim().isEmail().withMessage('Invalid email address'),
  body('password').trim().notEmpty().withMessage('Password cannot be empty').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
  validateRequest
];