import express from 'express';

import {
  validateFormDataHeader,
  validateQueryParams,
  validateRecipePayload_FORMDATA,
  validateUpdatedRecipePayload_FORMDATA,
  validateUploadedImage,
  validateID,
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
import jwtAuthentication from '../middlewares/authentication/jwtAuthenticate';

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
router.get('/recipes', jwtAuthentication, validateQueryParams, readAllRecipes);

// Get a s  ingle Recipe
router.get(
  '/recipes/:recipeID',
  jwtAuthentication,
  validateID('recipeID'),
  readRecipe
);

// create a recipe
router.post(
  '/recipes',
  jwtAuthentication,
  validateFormDataHeader,
  parseIncomingImage,
  validateUploadedImage,
  validateRecipePayload_FORMDATA,
  createRecipe
);
// update recipe
router.patch(
  '/recipes/:recipeID',
  jwtAuthentication,
  validateFormDataHeader,
  validateID('recipeID'),
  parseIncomingImage,
  validateUpdatedRecipePayload_FORMDATA,
  updateRecipe
);

// delete a recipe
router.delete(
  '/recipes/:recipeID',
  jwtAuthentication,
  validateID('recipeID'),
  deleteRecipe
);

export { router as RecipeRouter };
