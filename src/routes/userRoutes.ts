import express from 'express';
import {
  readAllUser,
  readUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import {
  validateFormDataHeader,
  validateID,
  validateUserPayload_FORMDATA,
} from '../middlewares/validator/validators';
import { upload } from './recipeRoutes';

const router = express.Router();

// multer middleware to parse non-file multipart/form-data
const parseFormData = upload.none();

router.get('/users', readAllUser);
router.get('/users/:userID', validateID('userID'), readUser);
router.post(
  '/users',
  validateFormDataHeader,
  parseFormData,
  validateUserPayload_FORMDATA,
  createUser
);
router.patch('/users/:userID', updateUser);
router.delete('/users/:userID', deleteUser);

export { router as UserRouter };
