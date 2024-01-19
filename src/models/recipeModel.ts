import { HydratedDocument, Model, Schema, model } from 'mongoose';
import { IRecipeImage } from './imageModel';

// Raw Recipe type
export interface IRecipe {
  image: IRecipeImage;
  title: string;
  description: string;
  rating: number;
  category: string;
  ingredients: string[];
  instructions: string[];
  equipments: string[];
  nutritionValues: {
    calories: number;
    carbohydrates: number;
    protein: number;
    fat: number;
    sodium: number;
    fiber: number;
  };
}

// custom named type
export type HydratedRecipeDocument = HydratedDocument<IRecipe>;

// for the model to be aware of its Methods we have to provide IRecipeMethods as the 3rd generic argument to Model<>
interface RecipeModel
  extends Model<IRecipe, {}, {}, {}, HydratedRecipeDocument> {
  //----------RecipeModel----------------------------------------------------------------------
  // in order to define static methods types in a model we have to extend its type definition
  // and add function type declaration inside the newly extended interface
  // because and I quote from Mongoose docs "Mongoose models do not have an explicit generic parameter for statics."
  //--------------------------------------------------------------------------------

  //-------------static methods--------------------------------
  // we define a static build function to enforce IRecipe interface
  build: (attr: IRecipe) => HydratedRecipeDocument;
}

// blueprint
const RecipeSchema = new Schema<IRecipe, RecipeModel>({
  image: {
    type: Schema.Types.ObjectId,
    ref: 'RecipeImage',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  equipments: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  nutritionValues: {
    calories: Number,
    carbohydrates: Number,
    protein: Number,
    fat: Number,
    sodium: Number,
    fiber: Number,
  },
});

// model static methods definition
RecipeSchema.static(
  'build',
  function build(attr: IRecipe): HydratedRecipeDocument {
    // keyword "this" refers to RecipeModel
    return new this(attr);
  }
);

// model based on the blueprint
const Recipe = model<IRecipe, RecipeModel>('Recipe', RecipeSchema);

export { Recipe };
