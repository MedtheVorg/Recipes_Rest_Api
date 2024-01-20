import { Request, Response } from 'express';
import { HttpCode } from '../utils/AppError';
import { HydratedRecipeDocument, Recipe } from '../models/recipeModel';
import {
  SpreadDocument,
  appendFilterOptionsToQuery,
  refactorRecipe,
} from '../utils/helperFunction';
import { RequestWithSortOptions } from '../middlewares/validator/validators';
import { HydratedImageDocument, RecipeImage } from '../models/imageModel';

/**
 * @method GET
 * @description  Get all recipes
 * @path  : /recipes
 */
const readAllRecipes = async (req: Request, res: Response) => {
  // filtering options
  const filterOptions = (req as RequestWithSortOptions).filterOptions;

  // query to execute
  const query = appendFilterOptionsToQuery(
    Recipe.find({}, { __v: 0 }).populate('image'),
    filterOptions
  );

  const fetchedRecipes: SpreadDocument<HydratedRecipeDocument>[] | [] =
    await query.exec();
  // refactor fetched Recipes

  const refactoredRecipes = fetchedRecipes.map(
    (recipe: HydratedRecipeDocument) => refactorRecipe(recipe)
  );
  res.status(HttpCode.OK).json({
    status: 200,
    docCount: refactoredRecipes.length,
    recipes: refactoredRecipes,
  });
};

/**
 * @method GET
 * @description  Get recipe by id
 * @path  : /recipes/:recipeID
 */
const readRecipe = async (req: Request, res: Response) => {
  const { recipeID } = req.params;

  const fetchedRecipe: SpreadDocument<HydratedRecipeDocument> | null =
    await Recipe.findById({ _id: recipeID }, { __v: 0 })
      .populate('image')
      .exec();

  fetchedRecipe
    ? res.status(HttpCode.OK).json(refactorRecipe(fetchedRecipe))
    : res.status(HttpCode.NOT_FOUND).json({ msg: 'Recipe not found.' });
};

/**
 * @method POST
 * @description  create a recipe
 * @path  : /recipes
 */
const createRecipe = async (req: Request, res: Response) => {
  const { filename, size, mimetype } = req.file as Express.Multer.File;
  const recipeImage = new RecipeImage({
    contentType: mimetype,
    filename: filename,
    size: size,
  });
  // save new Image data to mongoDB
  await recipeImage.save();

  const {
    title,
    description,
    rating,
    category,
    ingredients,
    instructions,
    equipments,
    calories,
    carbohydrates,
    protein,
    fat,
    sodium,
    fiber,
  } = req.body;

  const recipeBody = {
    image: recipeImage,
    title: title,
    description: description,
    rating: rating,
    category: category,
    ingredients: (ingredients as string).split(','),
    instructions: (instructions as string).split(','),
    equipments: (equipments as string).split(','),
    nutritionValues: {
      calories: calories,
      carbohydrates: carbohydrates,
      protein: protein,
      fat: fat,
      sodium: sodium,
      fiber: fiber,
    },
  };
  const newRecipe = Recipe.build(recipeBody);
  await newRecipe.save();
  res.status(HttpCode.CREATED).json(newRecipe);
};

/**
 * @method PATCH
 * @description  update a recipe
 * @path  : /recipes/:recipeID
 */
const updateRecipe = async (req: Request, res: Response) => {
  const { recipeID } = req.params;

  const fetchedRecipe: HydratedRecipeDocument | null = await Recipe.findById(
    recipeID
  ).exec();

  if (fetchedRecipe == null) {
    return res.status(HttpCode.NOT_FOUND).json('Recipe not found.');
  }

  let recipeImage: HydratedImageDocument | null = null;

  if (req.file !== undefined) {
    const { filename, size, mimetype } = req.file as Express.Multer.File;
    recipeImage = new RecipeImage({
      contentType: mimetype,
      filename: filename,
      size: size,
    });
    // save updated Image data to mongoDB
    await recipeImage.save();
  }

  const UpdatedRecipeBody = {
    image: recipeImage || fetchedRecipe.image,
    title: req.body.title || fetchedRecipe.title,
    description: req.body.description || fetchedRecipe.description,
    rating: req.body.rating || fetchedRecipe.rating,
    category: req.body.category || fetchedRecipe.category,
    ingredients: req.body.ingredients
      ? (req.body.ingredients as string).split(',')
      : fetchedRecipe.ingredients,
    instructions: req.body.instructions
      ? (req.body.instructions as string).split(',')
      : fetchedRecipe.instructions,
    equipments: req.body.equipments
      ? (req.body.equipments as string).split(',')
      : fetchedRecipe.equipments,
    nutritionValues: {
      calories: req.body.calories || fetchedRecipe.nutritionValues.calories,
      carbohydrates:
        req.body.carbohydrates || fetchedRecipe.nutritionValues.carbohydrates,
      protein: req.body.protein || fetchedRecipe.nutritionValues.protein,
      fat: req.body.fat || fetchedRecipe.nutritionValues.fat,
      sodium: req.body.sodium || fetchedRecipe.nutritionValues.sodium,
      fiber: req.body.fiber || fetchedRecipe.nutritionValues.fiber,
    },
  };

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    recipeID,
    UpdatedRecipeBody,
    {
      new: true,
    }
  );
  res.status(HttpCode.OK).json({ success: true, updatedRecipe: updatedRecipe });
};

/**
 * @method DELETE
 * @description  delete a recipe
 * @path  : /recipes/:recipeID
 */
const deleteRecipe = async (req: Request, res: Response) => {
  const { recipeID } = req.params;
  const deletedRecipe = await Recipe.findByIdAndDelete(recipeID).exec();

  deletedRecipe
    ? res.status(HttpCode.OK).json({ msg: 'Recipe Deleted.' })
    : res.status(HttpCode.NOT_FOUND).json({ msg: 'Recipe not found.' });
};

export { createRecipe, readAllRecipes, readRecipe, updateRecipe, deleteRecipe };
