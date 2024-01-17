import swaggerJsDoc from 'swagger-jsdoc';

const options: swaggerJsDoc.Options = {
  definition: {
    // Every API definition must include the version of the OpenAPI Specification that this definition is based on:
    openapi: '3.0.0',
    // general info about the API
    info: {
      title: 'Recipe API',
      version: '1.0.0',
      description:
        'Rest api that handles CRUD operations against a noSQL MongoDB Database.',
    },
    // list of servers that will serve the  swagger ui documentation interface
    servers: [
      {
        url: 'http://localhost:4500',
      },
    ],
    consumes: ['multipart/form-data'],
    produces: ['multipart/form-data', 'application/json'],
    schemes: ['http'],
    tags: [{ name: 'Recipe', description: 'Recipe managing API ' }],
    //components definition
    components: {
      schemas: {
        Recipe: {
          type: 'object',
          required: [
            'image',
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
          ],
          properties: {
            id: {
              type: 'string',
              description: 'The Recipe auto-generated ObjectId',
            },
            image: {
              type: 'file', // Assuming the image is a file name
              description: 'Recipe image (.png, jpeg, etc...)',
            },
            title: {
              type: 'string',
              description: 'Recipe title',
            },
            description: {
              type: 'string',
              description: 'Recipe description',
            },
            rating: {
              type: 'number',
              description: 'Recipe rating from 1 to 5',
            },
            category: {
              type: 'string',
              description:
                'Recipe category in (Moroccan, Mexican, Italian, Turkish, Chinese)',
            },
            ingredients: {
              type: 'string',
              description:
                'Comma-separated list of ingredients, e.g., "ingredient1,ingredient2,ingredient3"',
            },
            equipments: {
              type: 'string',
              description:
                'Comma-separated list of equipments, e.g., "equipment1,equipment2,equipment3"',
            },
            instructions: {
              type: 'string',
              description:
                'Comma-separated list of instructions, e.g., "instruction1,instruction2,instruction3"',
            },
            calories: {
              type: 'number',
              description: 'Number of calories (kcal)',
            },
            carbohydrates: {
              type: 'number',
              description: 'Number of carbohydrates (g)',
            },
            protein: {
              type: 'number',
              description: 'Number of protein (g)',
            },
            fat: {
              type: 'number',
              description: 'Number of fat (g)',
            },
            sodium: {
              type: 'number',
              description: 'Number of sodium (mg)',
            },
            fiber: {
              type: 'number',
              description: 'Number of fiber (g)',
            },
          },
          example: {
            id: '659bcb3443def0cb7d99eccb',
            image: 'chicken_tajine.jpeg',
            title: 'CHICKEN TAGINE',
            description:
              'A fragrant and flavorful Moroccan dish featuring slow-cooked chicken, apricots, almonds, and a blend of exotic spices.',
            rating: 5,
            category: 'Moroccan',
            ingredients:
              '4 chicken thighs, bone-in and skin-on,1 large onion, finely chopped,2 cloves garlic, minced',
            equipments: "Tagine or Dutch Oven,Chef's Knife,Wooden Spoon",
            instructions:
              'In a large tagine or Dutch oven, brown chicken thighs on both sides. Remove and set aside.,In the same pot, sauté chopped onions until translucent. Add minced garlic and sauté for an additional minute.,Stir in cumin, coriander, cinnamon, ginger, saffron, salt, and pepper. Cook for another 2 minutes until fragrant.',
            calories: 520,
            carbohydrates: 35,
            protein: 28,
            fat: 32,
            sodium: 680,
            fiber: 6,
          },
        },
        RecipeOutput: {
          type: 'object',
          required: [
            'image',
            'title',
            'description',
            'rating',
            'category',
            'ingredients',
            'equipments',
            'instructions',
            'nutritionValues',
          ],
          properties: {
            id: {
              type: 'string',
              description: 'The Recipe auto-generated ObjectId',
            },
            image: {
              type: 'string', // Assuming the image is a file name
              description: 'Recipe image (.png, jpeg, etc...)',
            },
            title: {
              type: 'string',
              description: 'Recipe title',
            },
            description: {
              type: 'string',
              description: 'Recipe description',
            },
            rating: {
              type: 'number',
              description: 'Recipe rating from 1 to 5',
            },
            category: {
              type: 'string',
              description:
                'Recipe category in (Moroccan, Mexican, Italian, Turkish, Chinese)',
            },
            ingredients: {
              type: 'string',
              description:
                'Comma-separated list of ingredients, e.g., "ingredient1,ingredient2,ingredient3"',
            },
            equipments: {
              type: 'string',
              description:
                'Comma-separated list of equipments, e.g., "equipment1,equipment2,equipment3"',
            },
            instructions: {
              type: 'string',
              description:
                'Comma-separated list of instructions, e.g., "instruction1,instruction2,instruction3"',
            },
            nutritionValues: {
              type: 'object',
              properties: {
                calories: {
                  type: 'object',
                  properties: {
                    value: {
                      type: 'number',
                    },
                    unit: {
                      type: 'string',
                      enum: ['kcal'],
                    },
                  },
                  required: ['value', 'unit'],
                },
                carbohydrates: {
                  type: 'object',
                  properties: {
                    value: {
                      type: 'number',
                    },
                    unit: {
                      type: 'string',
                      enum: ['g'],
                    },
                  },
                  required: ['value', 'unit'],
                },
                protein: {
                  type: 'object',
                  properties: {
                    value: {
                      type: 'number',
                    },
                    unit: {
                      type: 'string',
                      enum: ['g'],
                    },
                  },
                  required: ['value', 'unit'],
                },
                fat: {
                  type: 'object',
                  properties: {
                    value: {
                      type: 'number',
                    },
                    unit: {
                      type: 'string',
                      enum: ['g'],
                    },
                  },
                  required: ['value', 'unit'],
                },
                sodium: {
                  type: 'object',
                  properties: {
                    value: {
                      type: 'number',
                    },
                    unit: {
                      type: 'string',
                      enum: ['mg'],
                    },
                  },
                  required: ['value', 'unit'],
                },
                fiber: {
                  type: 'object',
                  properties: {
                    value: {
                      type: 'number',
                    },
                    unit: {
                      type: 'string',
                      enum: ['g'],
                    },
                  },
                  required: ['value', 'unit'],
                },
              },
              required: [
                'calories',
                'carbohydrates',
                'protein',
                'fat',
                'sodium',
                'fiber',
              ],
            },
          },
          example: {
            id: '659bcb3443def0cb7d99eccb',
            image: 'chicken_tajine.jpeg',
            title: 'CHICKEN TAGINE',
            description:
              'A fragrant and flavorful Moroccan dish featuring slow-cooked chicken, apricots, almonds, and a blend of exotic spices.',
            rating: 5,
            category: 'Moroccan',
            ingredients:
              '4 chicken thighs, bone-in and skin-on,1 large onion, finely chopped,2 cloves garlic, minced',
            equipments: "Tagine or Dutch Oven,Chef's Knife,Wooden Spoon",
            instructions:
              'In a large tagine or Dutch oven, brown chicken thighs on both sides. Remove and set aside.,In the same pot, sauté chopped onions until translucent. Add minced garlic and sauté for an additional minute.,Stir in cumin, coriander, cinnamon, ginger, saffron, salt, and pepper. Cook for another 2 minutes until fragrant.',
            nutritionValues: {
              calories: {
                value: 1,
                unit: 'kcal',
              },
              carbohydrates: {
                value: 1,
                unit: 'g',
              },
              protein: {
                value: 1,
                unit: 'g',
              },
              fat: {
                value: 1,
                unit: 'g',
              },
              sodium: {
                value: 1,
                unit: 'mg',
              },
              fiber: {
                value: 1,
                unit: 'g',
              },
            },
          },
        },
      },
    },
    // endpoints/paths/routes definition
    paths: {
      '/api/v1/recipes': {
        get: {
          tags: ['Recipe'],
          summary: 'Get all Recipes',
          description: 'Retrieve a list of all recipes.',
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: {
                        type: 'number',
                        default: 200,
                      },
                      docCount: {
                        type: 'number',
                        default: 1,
                      },
                      recipes: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/RecipeOutput',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          parameters: [
            {
              name: 'title',
              in: 'query',
              description: 'Search by title => ?title= (exact value)',
              type: 'string',
            },
            {
              name: 'description',
              in: 'query',
              description:
                'Search by description => ?description= (exact value)',
              type: 'string',
            },
            {
              name: 'rating',
              in: 'query',
              description:
                'Search by rating => ?rating=1 | ?rating_gt= | ?rating_lt= (by default rating is between 1 and 5)',
              type: 'number',
            },
            // {
            //   name: 'rating_gt',
            //   in: 'query',
            //   description: 'Recipe rating from 1 to 5',
            //   type: 'number',
            // },
            // {
            //   name: 'rating_lt',
            //   in: 'query',
            //   description: 'Recipe rating from 1 to 5',
            //   type: 'number',
            // },

            {
              name: 'category',
              in: 'query',
              description:
                'Search by category => ?category= in (Moroccan, Mexican, Italian, Turkish, Chinese)',
              type: 'string',
            },
            {
              name: 'sort',
              in: 'query',
              description:
                'Sort by a field => ?sort=target,asc by default sorting is in asc order (use desc to reverse the order)',
              type: 'string',
            },
            {
              name: 'limit',
              in: 'query',
              description:
                'limit => ?limit=10 limit the received documents number',
              type: 'number',
            },
            {
              name: 'search ',
              in: 'query',
              description:
                '?search= perform a global search on multiple fields',
              type: 'string',
            },
          ],
          // to indicate that only one query param can be chosen
          oneOf: [
            {
              required: ['rating'],
            },
            {
              required: ['rating_gt'],
            },
            {
              required: ['rating_lt'],
            },
          ],
        },

        post: {
          tags: ['Recipe'],
          summary: 'Create a recipe',
          description: 'create a new Recipe',
          requestBody: {
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  required: [
                    'image',
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
                  ],
                  properties: {
                    image: {
                      type: 'string',
                      format: 'binary',
                      description: 'Recipe image file (.png, jpeg, etc...)',
                    },
                    title: {
                      type: 'string',
                      description: 'Recipe title',
                    },
                    description: {
                      type: 'string',
                      description: 'Recipe description',
                    },
                    rating: {
                      type: 'number',
                      description: 'Recipe rating from 1 to 5',
                    },
                    category: {
                      type: 'string',
                      description: 'Recipe category',
                    },
                    ingredients: {
                      type: 'string',
                      description: 'Comma-separated list of ingredients',
                    },
                    equipments: {
                      type: 'string',
                      description: 'Comma-separated list of equipments',
                    },
                    instructions: {
                      type: 'string',
                      description: 'Comma-separated list of instructions',
                    },
                    calories: {
                      type: 'number',
                      description: 'Number of calories (kcal)',
                    },
                    carbohydrates: {
                      type: 'number',
                      description: 'Number of carbohydrates (g)',
                    },
                    protein: {
                      type: 'number',
                      description: 'Number of protein (g)',
                    },
                    fat: {
                      type: 'number',
                      description: 'Number of fat (g)',
                    },
                    sodium: {
                      type: 'number',
                      description: 'Number of sodium (mg)',
                    },
                    fiber: {
                      type: 'number',
                      description: 'Number of fiber (g)',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description:
                'Recipe created Successfully and you receive the newly created recipe. ',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      recipes: {
                        type: 'Object',
                        $ref: '#/components/schemas/RecipeOutput',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      '/api/v1/recipes/{recipeID}': {
        get: {
          tags: ['Recipe'],
          summary: 'Get recipe by ID',
          description: 'Execute a get request to fetch a recipe by its ',
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      recipe: {
                        type: 'object',
                        $ref: '#/components/schemas/RecipeOutput',
                      },
                    },
                  },
                },
              },
            },
            '404': {
              description: '404 recipe  not found ',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      msg: {
                        type: 'string',
                        default: 'Recipe not found.',
                      },
                    },
                  },
                },
              },
            },
          },
          parameters: [
            {
              name: 'recipeID',
              in: 'path',
              description: 'recipe id to search for',
              type: 'string',
            },
          ],
        },
        patch: {
          tags: ['Recipe'],
          summary: 'Update a recipe',
          description: 'send a patch request to update an existing Recipe',
          requestBody: {
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    image: {
                      type: 'string',
                      format: 'binary',
                      description: 'Recipe image file (.png, jpeg, etc...)',
                    },
                    title: {
                      type: 'string',
                      description: 'Recipe title',
                    },
                    description: {
                      type: 'string',
                      description: 'Recipe description',
                    },
                    rating: {
                      type: 'number',
                      description: 'Recipe rating from 1 to 5',
                    },
                    category: {
                      type: 'string',
                      description: 'Recipe category',
                    },
                    ingredients: {
                      type: 'string',
                      description: 'Comma-separated list of ingredients',
                    },
                    equipments: {
                      type: 'string',
                      description: 'Comma-separated list of equipments',
                    },
                    instructions: {
                      type: 'string',
                      description: 'Comma-separated list of instructions',
                    },
                    calories: {
                      type: 'number',
                      description: 'Number of calories (kcal)',
                    },
                    carbohydrates: {
                      type: 'number',
                      description: 'Number of carbohydrates (g)',
                    },
                    protein: {
                      type: 'number',
                      description: 'Number of protein (g)',
                    },
                    fat: {
                      type: 'number',
                      description: 'Number of fat (g)',
                    },
                    sodium: {
                      type: 'number',
                      description: 'Number of sodium (mg)',
                    },
                    fiber: {
                      type: 'number',
                      description: 'Number of fiber (g)',
                    },
                  },
                },
              },
            },
          },
          parameters: [
            {
              name: 'recipeID',
              in: 'path',
              description: 'recipe id to search for',
              type: 'string',
            },
          ],
          responses: {
            '200': {
              description:
                'Recipe updated Successfully and you receive the newly updated recipe. ',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      recipes: {
                        type: 'Object',
                        $ref: '#/components/schemas/RecipeOutput',
                      },
                    },
                  },
                },
              },
            },
          },
        },

        delete: {
          tags: ['Recipe'],
          summary: 'Delete a recipe by ID',
          description: 'Execute a delete request to delete  a recipe',
          responses: {
            '200': {
              description: 'Recipe Deleted.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      msg: {
                        type: 'string',
                        default: 'Recipe Deleted',
                      },
                    },
                  },
                },
              },
            },
            '404': {
              description: '404 recipe  not found ',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      msg: {
                        type: 'string',
                        default: 'Recipe not found.',
                      },
                    },
                  },
                },
              },
            },
          },
          parameters: [
            {
              name: 'recipeID',
              in: 'path',
              description: 'recipe id to search for',
              type: 'string',
            },
          ],
        },
      },
    },
  },

  //routes definitions location
  apis: ['../routes/recipeRouter.ts'],
};

// initialize swaggerJsDoc
export const swaggerUiSpecs = swaggerJsDoc(options);
