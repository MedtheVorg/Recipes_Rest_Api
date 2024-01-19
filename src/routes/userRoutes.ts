import express from 'express';
import {
  readAllUser,
  readUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import {
  validateApplicationJsonHeader,
  validateID,
  validateUserPayload_JSON,
} from '../middlewares/validator/validators';

const router = express.Router();

router.get('/users', readAllUser);
router.get('/users/:userID', validateID('userID'), readUser);
router.post(
  '/users',
  validateApplicationJsonHeader,
  validateUserPayload_JSON,
  createUser
);
router.patch('/users/:userID', updateUser);
router.delete('/users/:userID', deleteUser);

export { router as UserRouter };
