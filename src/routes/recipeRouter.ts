import express from 'express';

import {
  validateApplicationJsonHeader,
  validateFormDataHeader,
  validateQueryParams,
  validateRecipeId,
  validateRecipePayload_FORMDATA,
  validateUpdatedRecipePayload_FORMDATA,
  validateRecipePayload_JSON,
  validateUpdatedRecipePayload_JSON,
  validateUploadedImage,
} from '../middlewares/validator/validators';
import {
  createRecipe,
  deleteRecipe,
  readAllRecipes,
  readRecipe,
  updateRecipe,
} from '../controllers/recipeController';
import multer, { diskStorage } from 'multer';
import {
  handleImageDestination,
  handleImageFilename,
} from '../utils/helperFunction';

//-------Multer configuration---------
export const upload = multer({
  storage: diskStorage({
    destination: handleImageDestination,
    filename: handleImageFilename,
  }),
  limits: { files: 1 }, // accept only 1 file
});

// middleware to handle a single uploaded image
const parseIncomingImage = upload.single('uploaded_image');
//--------------------------------------
const router = express.Router();

// get all recipes
router.get('/recipes', validateQueryParams, readAllRecipes);

// Get a single Recipe
router.get('/recipes/:recipeID', validateRecipeId, readRecipe);

// create a recipe
router.post(
  '/recipes',
  validateFormDataHeader,
  parseIncomingImage,
  validateUploadedImage,
  validateRecipePayload_FORMDATA,
  createRecipe
);
// update recipe
router.patch(
  '/recipes/:recipeID',
  validateFormDataHeader,
  validateRecipeId,
  parseIncomingImage,
  validateUpdatedRecipePayload_FORMDATA,
  updateRecipe
);

// delete a recipe
router.delete('/recipes/:recipeID', validateRecipeId, deleteRecipe);

export { router as RecipeRouter };
