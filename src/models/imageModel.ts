import { HydratedDocument, Model, Schema, model } from 'mongoose';

export interface IRecipeImage {
  data: Buffer;
  contentType: string;
  filename: string;
  size: number;
}

interface RecipeImageModel extends Model<IRecipeImage> {}
export type HydratedImageDocument = HydratedDocument<IRecipeImage>;

const RecipeImageSchema = new Schema<IRecipeImage, RecipeImageModel>({
  contentType: String,
  filename: String,
  size: Number,
});

const RecipeImage = model<IRecipeImage, RecipeImageModel>(
  'RecipeImage',
  RecipeImageSchema
);

export { RecipeImage };
