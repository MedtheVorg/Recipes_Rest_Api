import { NextFunction, Request, Response } from 'express';
import { checkSchema, param } from 'express-validator';
import { ResultWithContext } from 'express-validator/src/chain';
import { AppError, HttpCode } from '../../utils/AppError';
import { Types } from 'mongoose';
import {
  containsAllExpectedFields,
  containsUnexpectedFields,
  isObjectEmpty,
} from '../../utils/helperFunction';
import {
  RecipeValidationSchema_FORMDATA,
  RecipeValidationSchema_JSON,
  UserValidationSchema_JSON,
  optionalRecipeValidationSchema_FORMDATA,
  optionalRecipeValidationSchema_JSON,
} from './schema/validationSchemas';
import Logger from '../../utils/logger';

export type FilterOptions = {
  title: any;
  description: any;
  rating: any;
  categories: any;
  ingredients: any;
  instructions: any;
  equipments: any;
  nutritionValues: any;
  sortBy: any;
  limit: any;
  searchBy: any;
};
export interface RequestWithSortOptions extends Request {
  filterOptions: FilterOptions;
}

// -----GENERAL VALIDATION MIDDLEWARES----
function validateID(idName: string) {
  return async function (req: Request, res: Response, next: NextFunction) {
    // validation chain rules
    const validationChain = param(idName)
      .trim()
      .notEmpty()
      .custom((valueToValidate: any) => {
        return Types.ObjectId.isValid(valueToValidate);
      })
      .withMessage(`${idName} must be a valid mongoose ObjectID`);

    // run the current validation chain against the req object
    const validationResult = await validationChain.run(req);

    // if an error is encountered
    if (!validationResult.isEmpty()) {
      const errorMessage = validationResult.array()[0].msg;
      next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: errorMessage,
        })
      );
    } else {
      next();
    }
  };
}

//#region  -----RECIPE VALIDATION MIDDLEWARES----

async function validateRecipePayload_JSON(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // check if req.body is empty
  if (!isObjectEmpty(req.body)) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description: 'Request body cannot be empty',
    });
  }

  //check if an unknown field was provided
  const fieldsToValidate = Object.keys(req.body);
  const validFields = Object.keys(RecipeValidationSchema_JSON);
  const { isValid, unknownField } = containsUnexpectedFields(
    fieldsToValidate,
    validFields
  );

  if (!isValid) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description: ` unknown field : ${unknownField}  - Recipe payload must only  contain the following  properties : ${Object.keys(
        RecipeValidationSchema_JSON
      ).toString()}`,
    });
  }

  // validate incoming request payload against the req object
  const validationResultArray: ResultWithContext[] = await checkSchema(
    RecipeValidationSchema_JSON,
    ['body']
  ).run(req);

  if (validationResultArray.length > 0) {
    validationResultArray.forEach((ValidationResult: ResultWithContext) => {
      // throw the first error of the invalid field
      if (ValidationResult.array().length > 0) {
        const errorMsg = ValidationResult.array()[0].msg;
        // throw custom Error for the errorHandler middleware to catch and handle
        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: errorMsg,
        });
      }
    });
  }

  next();
}
async function validateRecipePayload_FORMDATA(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // check if req.body is empty
  if (!isObjectEmpty(req.body)) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description: 'Request body cannot be empty',
    });
  }
  // check if all required fields were provided
  // this is necessary as express-validator was made to handle json data only
  // and for multipart/form-data we need to implement manual checking
  const result = containsAllExpectedFields(req.body, [
    'title',
    'description',
    'rating',
    'category',
    'ingredients',
    'equipments',
    'instructions',
    'calories',
    'carbohydrates',
    'protein',
    'fat',
    'sodium',
    'fiber',
  ]);
  if (!result.isValid) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description: `your request body is missing the following fields : ${result.missingFields.toString()}`,
    });
  }

  // validate incoming request payload against the req object
  const validationResultArray: ResultWithContext[] = await checkSchema(
    RecipeValidationSchema_FORMDATA,
    ['body']
  ).run(req);

  if (validationResultArray.length > 0) {
    validationResultArray.forEach((ValidationResult: ResultWithContext) => {
      // throw the first error of the invalid field
      if (ValidationResult.array().length > 0) {
        const errorMsg = ValidationResult.array()[0].msg;
        // throw custom Error for the errorHandler middleware to catch and handle
        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: errorMsg,
        });
      }
    });
  }

  next();
}
async function validateUpdatedRecipePayload_FORMDATA(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // check if req.body is empty
  if (!isObjectEmpty(req.body)) {
    next(
      new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: 'Request body cannot be empty',
      })
    );
  }

  //check if an unknown field was provided
  const fieldsToValidate = Object.keys(req.body);
  const validFields = Object.keys(RecipeValidationSchema_FORMDATA);
  const { isValid, unknownField } = containsUnexpectedFields(
    fieldsToValidate,
    validFields
  );

  if (!isValid) {
    next(
      new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: ` unknown field : ${unknownField}  - Recipe payload must only  contain the following  properties : ${Object.keys(
          RecipeValidationSchema_FORMDATA
        ).toString()}`,
      })
    );
  }

  // validate incoming request payload against the req object
  const validationResultArray: ResultWithContext[] = await checkSchema(
    optionalRecipeValidationSchema_FORMDATA,
    ['body']
  ).run(req);

  if (validationResultArray.length > 0) {
    validationResultArray.forEach((ValidationResult: ResultWithContext) => {
      // throw the first error of the invalid field
      if (ValidationResult.array().length > 0) {
        const errorMsg = ValidationResult.array()[0].msg;
        // throw custom Error for the errorHandler middleware to catch and handle
        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: errorMsg,
        });
      }
    });
  }

  next();
}
async function validateUpdatedRecipePayload_JSON(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // check if req.body is empty
  if (isObjectEmpty(req.body)) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description: 'Request body cannot be empty',
    });
  }
  //check if an unknown field was provided
  const fieldsToValidate = Object.keys(req.body);
  const validFields = Object.keys(optionalRecipeValidationSchema_JSON);
  const { isValid, unknownField } = containsUnexpectedFields(
    fieldsToValidate,
    validFields
  );

  if (!isValid) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description: ` unknown field : ${unknownField}  - Recipe payload must only  contain the following  properties : ${Object.keys(
        optionalRecipeValidationSchema_JSON
      ).toString()}`,
    });
  }

  // validate incoming request payload against the req object
  const validationResultArray: ResultWithContext[] = await checkSchema(
    optionalRecipeValidationSchema_JSON,
    ['body']
  ).run(req);

  if (validationResultArray.length > 0) {
    validationResultArray.forEach((ValidationResult: ResultWithContext) => {
      // throw the first error of the invalid field
      if (ValidationResult.array().length > 0) {
        const errorMsg = ValidationResult.array()[0].msg;
        // throw custom Error for the errorHandler middleware to catch and handle

        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: errorMsg,
        });
      }
    });
  }
  next();
}
async function validateFormDataHeader(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.header('content-type') == undefined) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description:
        'Missing Content-Type header, please make sure to include it with your request.',
    });
  }
  if (!req.header('content-type')?.includes('multipart/form-data')) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description:
        'Content-Type header has the wrong value ,expected value : "multipart/form-data".',
    });
  }

  next();
}
async function validateApplicationJsonHeader(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.header('content-type') == undefined) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description:
        'Missing Content-Type header, please make sure to include it with your request.',
    });
  } else if (req.header('content-type') !== 'application/json') {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description:
        'Content-Type header has the wrong value ,expected value : "application/json".',
    });
  }

  next();
}
async function validateQueryParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const queryParams = req.query as unknown as URLSearchParams;
  (req as RequestWithSortOptions).filterOptions = {
    title: null,
    description: null,
    rating: null,
    categories: null,
    ingredients: null,
    instructions: null,
    equipments: null,
    nutritionValues: null,
    sortBy: null,
    limit: null,
    searchBy: null,
  };

  //title
  if (queryParams.has('title')) {
    (req as RequestWithSortOptions).filterOptions.title =
      queryParams.get('title');
  }

  //description
  if (queryParams.has('description')) {
    (req as RequestWithSortOptions).filterOptions.description =
      queryParams.get('description');
  }

  //rating
  if (queryParams.has('rating')) {
    if (!Number.isNaN(Number(queryParams.get('rating')))) {
      (req as RequestWithSortOptions).filterOptions.rating = Math.abs(
        Math.floor(Number(queryParams.get('rating')))
      ).toString();
    }
  }
  if (queryParams.has('rating_gt')) {
    if (!Number.isNaN(Number(queryParams.get('rating_gt')))) {
      (req as RequestWithSortOptions).filterOptions.rating = {
        value: Math.abs(Math.floor(Number(queryParams.get('rating_gt')))),
        operator: 'gt',
      };
    }
  }

  if (queryParams.has('rating_lt')) {
    if (!Number.isNaN(Number(queryParams.get('rating_lt')))) {
      (req as RequestWithSortOptions).filterOptions.rating = {
        value: Math.abs(Math.floor(Number(queryParams.get('rating_lt')))),
        operator: 'lt',
      };
    }
  }

  //category
  if (queryParams.has('category')) {
    const validCategories = [
      'Moroccan',
      'Mexican',
      'Italian',
      'Turkish',
      'Chinese',
    ];
    let categories: string | string[] = [];
    if (queryParams.get('category')!.toLowerCase() === 'all') {
      categories = [...validCategories];
    } else {
      // exclude invalid categories
      categories = queryParams
        .get('category')!
        .split(',')
        .filter((category) => {
          return validCategories.includes(category);
        });
      if (categories.length == 0) {
        categories = [...validCategories];
      }
    }

    (req as RequestWithSortOptions).filterOptions.categories = categories;
  }

  //sort
  if (queryParams.has('sort')) {
    let sortBy: { [index: string]: string } = {};
    let sort = queryParams.get('sort')!.split(',');
    if (sort[1]) {
      const validSortOptions = [
        'asc',
        'desc',
        'ascending',
        'descending',
        '1',
        '-1',
      ];
      sortBy[sort[0]] = validSortOptions.includes(sort[1].toLowerCase())
        ? sort[1]
        : 'asc';
    } else {
      sortBy[sort[0]] = 'asc';
    }
    (req as RequestWithSortOptions).filterOptions.sortBy = sortBy;
  }

  // limit
  if (queryParams.has('limit')) {
    if (!Number.isNaN(Number(queryParams.get('limit')))) {
      (req as RequestWithSortOptions).filterOptions.limit = Math.abs(
        Math.floor(Number(queryParams.get('limit')))
      ).toString();
    }
  }

  // searchBy
  if (queryParams.has('search')) {
    (req as RequestWithSortOptions).filterOptions.searchBy =
      queryParams.get('search');
  }
  next();
}
async function validateUploadedImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.file === undefined) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description: 'uploaded_image field is required',
    });
  }
  next();
}
//#endregion

//#region -----USER VALIDATION MIDDLEWARES----

async function validateUserPayload_JSON(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validationResultArray = await checkSchema(UserValidationSchema_JSON, [
    'body',
  ]).run(req);

  if (validationResultArray.length > 0) {
    validationResultArray.forEach((ValidationResult: ResultWithContext) => {
      if (ValidationResult.array().length > 0) {
        const errorMsg = ValidationResult.array()[0].msg;
        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: errorMsg,
        });
      }
    });
  }

  next();
}
//#endregion

export {
  validateRecipePayload_FORMDATA,
  validateRecipePayload_JSON,
  validateApplicationJsonHeader,
  validateQueryParams,
  validateFormDataHeader,
  validateUploadedImage,
  validateUpdatedRecipePayload_FORMDATA,
  validateUpdatedRecipePayload_JSON,
  validateID,
  validateUserPayload_JSON,
};
