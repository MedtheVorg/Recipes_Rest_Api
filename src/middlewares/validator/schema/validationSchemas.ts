import {
  addCommonRules,
  allPropertiesAreValid,
  nutritionValuesContainsAllExpectedFields,
  isArrayEmpty,
  isArrayOfStrings,
  isNotObject,
  isObjectEmpty,
} from '../../../utils/helperFunction';

//--------------------EXPRESS VALIDATOR  SCHEMAS----------------------
export const RecipeValidationSchema_JSON = {
  title: {
    trim: true,
    notEmpty: {
      errorMessage: 'title must not be empty',
      bail: true,
    },
    isString: {
      errorMessage: 'title should be a string',
      bail: true,
    },

    isLength: {
      options: {
        min: 5,
      },
      errorMessage: 'title should be at least 5 characters long',
      bail: true,
    },
  },
  description: {
    trim: true,
    notEmpty: {
      errorMessage: 'description must not be empty',
      bail: true,
    },
    isString: {
      errorMessage: 'description should be a string',
      bail: true,
    },
  },
  rating: {
    notEmpty: {
      errorMessage: 'rating must not be empty',
      bail: true,
    },
    isNumeric: {
      errorMessage: 'rating should be a number',
      bail: true,
    },
    isIn: {
      options: [[1, 2, 3, 4, 5]],
      errorMessage: 'rating must be 1,2,3,4 or 5',
      bail: true,
    },
  },
  category: {
    trim: true,
    notEmpty: {
      errorMessage: 'category must not be empty',
      bail: true,
    },
    isString: {
      errorMessage: 'category should be a string',
      bail: true,
    },
    isIn: {
      options: [['Moroccan', 'Mexican', 'Italian', 'Turkish', 'Chinese']],
      errorMessage: `category must be on of the following options : [${[
        'Moroccan',
        'Mexican',
        'Italian',
        'Turkish',
        'Chinese',
      ].toString()}]`,
      bail: true,
    },
  },
  ingredients: {
    isArray: {
      errorMessage: 'Ingredients field must be an array',
      bail: true,
    },

    isArrayEmpty: {
      custom: isArrayEmpty,
      errorMessage: 'Ingredients Array must not be empty',
      bail: true,
    },
    custom: {
      options: isArrayOfStrings,
      bail: true,
      errorMessage: 'All ingredients Array elements must be of type string ',
    },
  },
  instructions: {
    trim: true,
    isArray: {
      errorMessage: 'Instructions field must be an array',
      bail: true,
    },
    isArrayEmpty: {
      custom: isArrayEmpty,
      errorMessage: 'Ingredients Array must not be empty',
      bail: true,
    },

    custom: {
      options: isArrayOfStrings,
      bail: true,
      errorMessage: 'All Instructions Array elements must be of type string ',
    },
  },
  equipments: {
    isArray: {
      errorMessage: 'Equipments field must be an array',
      bail: true,
    },

    isArrayEmpty: {
      custom: isArrayEmpty,
      errorMessage: 'Ingredients Array must not be empty',
      bail: true,
    },
    isArrayOfStrings: {
      custom: isArrayOfStrings,
      bail: true,
      errorMessage: 'All equipments Array elements must be of type string ',
    },
  },
  nutritionValues: {
    isNotObject: {
      custom: isNotObject,
      bail: true,
      errorMessage: 'nutritionValues must be an object',
    },
    isObjectEmpty: {
      custom: isObjectEmpty,
      bail: true,
      errorMessage: 'nutritionValues  object must not be empty',
    },
    nutritionValuesContainsAllExpectedFields: {
      custom: nutritionValuesContainsAllExpectedFields,
      bail: true,
      errorMessage:
        'nutritionValues  object must contain the following properties : calories, carbohydrates, protein, fat, sodium and fiber',
    },
    allPropertiesAreValid: {
      custom: allPropertiesAreValid,
      bail: true,
    },
  },
};
export const optionalRecipeValidationSchema_JSON = addCommonRules(
  RecipeValidationSchema_JSON,
  {
    optional: true,
  }
);

export const RecipeValidationSchema_FORMDATA = {
  title: {
    trim: true,
    notEmpty: {
      errorMessage: 'title must not be empty',
      bail: true,
    },
    isString: {
      errorMessage: 'title should be a string',
      bail: true,
    },

    isLength: {
      options: {
        min: 5,
      },
      errorMessage: 'title should be at least 5 characters long',
      bail: true,
    },
  },
  description: {
    trim: true,
    notEmpty: {
      errorMessage: 'description must not be empty',
      bail: true,
    },
    isString: {
      errorMessage: 'description should be a string',
      bail: true,
    },
  },
  rating: {
    notEmpty: {
      errorMessage: 'rating must not be empty',
      bail: true,
    },
    isNumeric: {
      errorMessage: 'rating should be a number',
      bail: true,
    },
    isIn: {
      options: [[1, 2, 3, 4, 5]],
      errorMessage: 'rating must be 1,2,3,4 or 5',
      bail: true,
    },
  },
  category: {
    trim: true,
    notEmpty: {
      errorMessage: 'category must not be empty',
      bail: true,
    },
    isString: {
      errorMessage: 'category should be a string',
      bail: true,
    },

    isIn: {
      options: [['Moroccan', 'Mexican', 'Italian', 'Turkish', 'Chinese']],
      errorMessage: `category must be on of the following options : [${[
        'Moroccan',
        'Mexican',
        'Italian',
        'Turkish',
        'Chinese',
      ].toString()}]`,
      bail: true,
    },
  },
  ingredients: {
    trim: true,
    notEmpty: {
      errorMessage: 'ingredients must not be empty',
      bail: true,
    },
    isString: {
      errorMessage: 'ingredients should be a string',
      bail: true,
    },
  },
  instructions: {
    trim: true,
    notEmpty: {
      errorMessage: 'instructions must not be empty',
      bail: true,
    },
    isString: {
      errorMessage: 'instructions should be a string',
      bail: true,
    },
  },
  equipments: {
    trim: true,
    notEmpty: {
      errorMessage: 'equipments must not be empty',
      bail: true,
    },
    isString: {
      errorMessage: 'equipments should be a string',
      bail: true,
    },
  },
  calories: {
    notEmpty: {
      errorMessage: 'calories must not be empty',
      bail: true,
    },
    isNumeric: {
      errorMessage: 'calories should be a number',
      bail: true,
    },
    isInt: {
      errorMessage: 'calories should be a positive a number',
      bail: true,
      options: {
        min: 0,
      },
    },
  },
  carbohydrates: {
    notEmpty: {
      errorMessage: 'carbohydrates must not be empty',
      bail: true,
    },
    isNumeric: {
      errorMessage: 'carbohydrates should be a number',
      bail: true,
    },
    isInt: {
      errorMessage: 'carbohydrates should be a positive a number',
      bail: true,
      options: {
        min: 0,
      },
    },
  },
  protein: {
    notEmpty: {
      errorMessage: 'protein must not be empty',
      bail: true,
    },
    isNumeric: {
      errorMessage: 'protein should be a number',
      bail: true,
    },
    isInt: {
      errorMessage: 'protein should be a positive a number',
      bail: true,
      options: {
        min: 0,
      },
    },
  },
  fat: {
    notEmpty: {
      errorMessage: 'fat must not be empty',
      bail: true,
    },
    isNumeric: {
      errorMessage: 'fat should be a number',
      bail: true,
    },
    isInt: {
      errorMessage: 'fat should be a positive a number',
      bail: true,
      options: {
        min: 0,
      },
    },
  },
  sodium: {
    notEmpty: {
      errorMessage: 'sodium must not be empty',
      bail: true,
    },
    isNumeric: {
      errorMessage: 'sodium should be a number',
      bail: true,
    },
    isInt: {
      errorMessage: 'sodium should be a positive a number',
      bail: true,
      options: {
        min: 0,
      },
    },
  },
  fiber: {
    notEmpty: {
      errorMessage: 'fiber must not be empty',
      bail: true,
    },
    isNumeric: {
      errorMessage: 'fiber should be a number',
      bail: true,
    },
    isInt: {
      errorMessage: 'fiber should be a positive a number',
      bail: true,
      options: {
        min: 0,
      },
    },
  },
};
export const optionalRecipeValidationSchema_FORMDATA = addCommonRules(
  RecipeValidationSchema_FORMDATA,
  {
    optional: true,
  }
);

//-------------------------------------------------------------
