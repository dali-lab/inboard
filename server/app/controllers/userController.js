import UserModel from '../models/userModel';
import { validateEmail, validatePassword } from '../services/validators';
import { tokenForUser } from '../services/passport';

export const createUser = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  const errorMessages = {};

  const emailTaken = await UserModel.findOne({ email });
  if (emailTaken) {
    errorMessages.email = 'This email is already taken.';
  }

  if (!validateEmail(email)) {
    errorMessages.email = 'Please enter a valid email.';
  }

  if (!validatePassword(password)) {
    errorMessages.password = 'Your password must be at least 6 characters.';
  }

  const errorType =
    Object.keys(errorMessages).length > 0 ? 'INVALID_FORM' : null;

  if (errorType !== null) {
    res.status(400).json({
      errorType,
      errorMessages,
    });
    return;
  }

  const newUser = new UserModel({
    email,
    password,
    firstName,
    lastName,
  });

  try {
    const savedUserModel = await newUser.save();
    res.status(200).json({
      token: tokenForUser(savedUserModel.id),
      user: savedUserModel,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      errorType: 'FAILED_TO_SAVE',
      errorMessage: 'Something went wrong, please try again',
    });
  }
};

export const signInUser = async (req, res, next) => {
  const { email } = req.user;
  try {
    const result = await UserModel.findOne({ email });
    if (result) {
      res.status(200).json({
        token: tokenForUser(result._id),
        user: result,
      });
    } else {
      res.status(400).json({
        errorType: 'USER_NOT_FOUND',
        errorMessagee: 'Something went wrong, please try again',
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      errorType: 'SIGN_IN_ERROR',
      errorMessage: 'Something went wrong, please try again',
    });
  }
};

export const getUser = async (req, res, next) => {
  const { email } = req.user;

  try {
    const result = await UserModel.findOne({ email });
    if (result) {
      res.status(200).json({ user: result });
    } else {
      res.status(400).json({
        errorType: 'USER_NOT_FOUND',
        errorMessage: 'Something went wrong, please try again',
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      errorType: 'INTERNAL_ERROR',
      errorMessage: 'Something went wrong, please try again',
    });
  }
};
