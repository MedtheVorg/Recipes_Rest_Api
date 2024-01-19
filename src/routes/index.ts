import express from 'express';
import { RecipeRouter } from './recipeRoutes';
import { UserRouter } from './userRoutes';
import { playgroundRoutes } from './playgroundRoutes';
const router = express.Router();

router.use(UserRouter);
router.use(RecipeRouter);
router.use('/playground', playgroundRoutes);

export { router as GlobalRouter };
