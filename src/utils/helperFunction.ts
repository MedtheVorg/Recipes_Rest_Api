import { Query } from 'mongoose';
import { FilterOptions } from '../middlewares/validator/validators';
import { HydratedRecipeDocument, Recipe } from '../models/recipeModel';
import { Request } from 'express';
import { compare, genSalt, hash } from 'bcrypt';
import { HydratedUserDocument } from '../models/userModel';

function appendFilterOptionsToQuery(
  baseQuey: Query<any, any>,
  filterOptions: FilterOptions
) {
  for (const [option, optionValue] of Object.entries(filterOptions)) {
    if (optionValue !== null) {
      switch (option) {
        case 'title':
          baseQuey = baseQuey.where('title').equals(optionValue);
          break;
        case 'description':
          baseQuey = baseQuey.where('description').equals(optionValue);
          break;
        case 'rating':
          if (isObject(optionValue)) {
            const ratingOptions: { value: number; operator: string } =
              optionValue;
            if (ratingOptions.operator == 'gt') {
              baseQuey = baseQuey.where('rating').gt(ratingOptions.value);
            } else if (ratingOptions.operator == 'lt') {
              baseQuey = baseQuey.where('rating').lt(ratingOptions.value);
            }
          } else {
            baseQuey = baseQuey.where('rating').equals(optionValue);
          }
          break;
        case 'categories':
          baseQuey = baseQuey.where('category').in(optionValue);
          break;
        case 'sortBy':
          baseQuey = baseQuey.sort(optionValue);
          break;
        case 'limit':
          baseQuey = baseQuey.limit(optionValue);
          break;
        case 'searchBy':
          //apply a regex search on the following fields :
          // 'title','description','category','ingredients','equipments','instructions',
          console.log(Object.keys(Recipe.schema.paths));

          const filterQueryArray = Object.keys(Recipe.schema.paths)
            .slice(0, 7)
            .filter((ele) => ele !== 'rating' && ele !== 'image')
            .map((field) => ({
              [field]: { $regex: new RegExp(optionValue, 'i') },
            }));
          console.log(filterQueryArray);

          baseQuey = baseQuey.or(filterQueryArray);
          break;
      }
    }
  }
  return baseQuey;
}
// checks if a set of fields exist in another set of fields
function isObject(val: any) {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}
// helper function to add additional rules to a pre defined schema
export function addCommonRules(schema: any, commonRules: any) {
  for (const field in schema) {
    schema[field] = { ...schema[field], ...commonRules };
  }
  return schema;
}
export function containsUnexpectedFields(
  fieldsToValidate: string[],
  validFields: string[]
) {
  // verifying that all fields are valid fields.
  for (const suspiciousField of fieldsToValidate) {
    if (!validFields.includes(suspiciousField)) {
      return { isValid: false, unknownField: suspiciousField };
    }
  }
  return { isValid: true };
}

//--------------------CUSTOM FIELD VALIDATORS------------------------------------
export function isArrayOfStrings(valueToValidate: any) {
  // Check if every element in the array is a string
  if (!valueToValidate.every((item: any) => typeof item === 'string')) {
    // validation failed
    return false;
  }
  // If everything is valid, return true
  return true;
}
export function isNotObject(valueToValidate: any) {
  return !(
    typeof valueToValidate === 'object' &&
    valueToValidate !== null &&
    !Array.isArray(valueToValidate)
  );
}
export function isObjectEmpty(valueToValidate: any) {
  return Object.keys(valueToValidate).length !== 0;
}
export function nutritionValuesContainsAllExpectedFields(valueToValidate: any) {
  //provided Object has less or more than 6 props
  if (Object.keys(valueToValidate).length != 6) return false;

  const validNutritionValues = [
    'calories',
    'carbohydrates',
    'protein',
    'fat',
    'sodium',
    'fiber',
  ];

  // verifying that the provided props are indeed valid nutrition values
  for (const nutritionValue of Object.keys(valueToValidate)) {
    if (!validNutritionValues.includes(nutritionValue.toLowerCase())) {
      return false;
    }
  }

  return true;
}
export function containsAllExpectedFields(
  valueToValidate: any,
  expectedFields: string[]
) {
  const outcome: { isValid: boolean; missingFields: string[] } = {
    isValid: true,
    missingFields: [...expectedFields],
  };

  // verifying that the provided fields match the expectedFields array content
  for (const valueToCheck of Object.keys(valueToValidate)) {
    if (expectedFields.includes(valueToCheck.toLowerCase())) {
      outcome.missingFields.splice(
        outcome.missingFields.indexOf(valueToCheck.toLowerCase()),
        1
      );
    }
  }

  outcome.isValid = outcome.missingFields.length > 0 ? false : true;
  return outcome;
}
export function allPropertiesAreValid(valueToValidate: any) {
  // check if all nutritionValues fields exist and  are valid.
  for (const [nutritionName, nutritionValue] of Object.entries(
    valueToValidate
  )) {
    if (!Number.isInteger(nutritionValue)) {
      throw new Error(`In nutritionValues : ${nutritionName} must be a number`);
    }
    if (Number(nutritionValue) < 0) {
      throw new Error(
        `In nutritionValues :  ${nutritionName}  value must be greater than 0`
      );
    }
  }
  // If everything is valid, return true
  return true;
}
export function isArrayEmpty(valueToValidate: any[]) {
  return valueToValidate.length !== 0;
}

// Mongoose adds metadata properties to fetched Documents such as $__(InternalCache) and $isNew
// plus the actual Document data  stored in _doc property
// so for TypeScript to be aware of _doc we need to define a generic type that takes
// a pre defined type (IRecipe in our case) as an argument and adds an optional _doc property to it
export type SpreadDocument<T> = T & {
  _doc?: T;
};
export function refactorRecipe(
  recipeDocument: SpreadDocument<HydratedRecipeDocument>
) {
  let originalNutritionValues = { ...recipeDocument._doc?.nutritionValues };
  return {
    ...recipeDocument._doc,
    nutritionValues: {
      calories: {
        value: originalNutritionValues.calories,
        unit: 'kcal',
      },
      carbohydrates: {
        value: originalNutritionValues.carbohydrates,
        unit: 'g',
      },
      protein: {
        value: originalNutritionValues.protein,
        unit: 'g',
      },
      fat: {
        value: originalNutritionValues.fat,
        unit: 'g',
      },
      sodium: {
        value: originalNutritionValues.sodium,
        unit: 'mg',
      },
      fiber: {
        value: originalNutritionValues.fiber,
        unit: 'g',
      },
    },
  };
}

// in Multer
export function handleImageFilename(
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void
) {
  // handle multer processed image
  const { originalname } = file;

  callback(null, originalname);
}
export function handleImageDestination(
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, destination: string) => void
) {
  callback(null, './uploads');
}
//-------------------------------------------------------------

// password hashing / decrypting functions using bcrypt library
export async function generateHashedPassword(password: string) {
  const salt = await genSalt(12);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}
export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

// JWT
import jwt from 'jsonwebtoken';
import { PRIV_KEY } from '../middlewares/authentication/PEM-ENCODED-KEYS';
export function issueJWT(user: HydratedUserDocument) {
  const _id = user._id;

  //it is usually 2 weeks
  const expiresIn = 20000;

  // jwt payload
  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: 'RS256',
  });

  return {
    token: 'Bearer ' + signedToken,
    expiresIn: expiresIn,
  };
}
export { appendFilterOptionsToQuery };
