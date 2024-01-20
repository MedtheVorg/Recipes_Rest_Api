import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import { version } from '../../package.json';
import { Request, Response, Express } from 'express';
import Logger from '../utils/logger';
const options: swaggerJsDoc.Options = {
  definition: {
    // Every API definition must include the version of the OpenAPI Specification that this definition is based on:
    openapi: '3.0.0',
    // general info about the API
    info: {
      title: 'Recipe REST API Docs',
      version: version,
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

    tags: [
      {
        name: 'Authentication',
        description:
          'authenticate  yourself before performing CRUD operations on Recipe routes',
      },
      { name: 'healthcheck' },

      {
        name: 'Recipe',
        description: 'Recipe managing API ',
      },
    ],

    //components definition
    components: {
      schemas: {
        CreateRecipeInput: {
          type: 'object',

          required: [
            'uploaded_image',
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
            uploaded_image: {
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
        CreateRecipeResponse: {
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
        RegisterUserInput: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'username',
              default: 'john Doe',
            },
            password: {
              type: 'string',
              description: 'StringPassword123',
            },
          },
          example: {
            username: 'John Doe',
            password: 'StringPassword1234',
          },
        },
        LoginUserInput: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              default: 'johnDoe',
            },
            password: {
              type: 'string',
            },
          },
          example: {
            username: 'johnDoe',
            password: 'StringPassword1234',
          },
        },
      },
      // add the possibility to provide a jwt token
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Enter your bearer token in the format `<token>` with No Bearer Prefix',
        },
      },
    },

    // endpoints/paths/routes definition
    paths: {
      '/api/v1/playground/register': {
        post: {
          tags: ['Authentication'],
          summary: 'register a new  user.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/components/schemas/RegisterUserInput',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Created',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        default: true,
                      },
                      message: {
                        type: 'string',
                        default: 'user created successfully',
                      },
                    },
                  },
                },
              },
            },
            '409': {
              description: 'Conflict',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        default: 'user already exists.',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/playground/login': {
        post: {
          tags: ['Authentication'],
          summary: 'login as a user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/components/schemas/LoginUserInput',
                },
              },
            },
          },
          responses: {
            '200': {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        default: 'logged in successfully',
                      },
                      user: {
                        type: 'object',
                        properties: {
                          _id: {
                            type: 'string',
                          },
                          username: {
                            type: 'string',
                          },
                          isAdmin: {
                            type: 'boolean',
                          },
                        },
                      },
                      token: {
                        type: 'object',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/healthcheck': {
        get: {
          tags: ['healthcheck'],
          description: 'Responds if the app is up and running',
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      msg: {
                        type: 'string',
                        default: 'Server is up and running',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      '/api/v1/recipes': {
        get: {
          tags: ['Recipe'],
          summary: 'Get all Recipes',
          description: 'Retrieve a list of all recipes.',
          security: [{ bearerAuth: [] }],

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
                          $ref: '#/components/schemas/CreateRecipeResponse',
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
              description: 'title = ? (exact value)',
              type: 'string',
            },
            {
              name: 'description',
              in: 'query',
              description: 'description = ? (exact value)',
              type: 'string',
            },
            {
              name: 'rating',
              in: 'query',
              description: 'Recipe = ?  (by default rating is between 1 and 5)',
              type: 'number',
            },
            {
              name: 'rating_gt',
              in: 'query',
              description: 'Recipe > ?',
              type: 'number',
            },
            {
              name: 'rating_lt',
              in: 'query',
              description: 'Recipe < ?',
              type: 'number',
            },

            {
              name: 'category',
              in: 'query',
              description:
                'category = ?  [Moroccan, Mexican, Italian, Turkish, Chinese]',
              type: 'string',
            },
            {
              name: 'sort',
              in: 'query',
              description:
                'sort = target,asc by default sorting is in asc order (use desc to reverse the order)',
              type: 'string',
            },
            {
              name: 'limit',
              in: 'query',
              description: 'limit = ? (limit the received documents number)',
              type: 'number',
            },
            {
              name: 'search',
              in: 'query',
              description:
                'search = ? (perform a global search on multiple fields)',
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
          security: [{ bearerAuth: [] }],

          requestBody: {
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  required: [
                    'uploaded_image',
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
                    uploaded_image: {
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
                      description:
                        'Recipe category [Moroccan, Mexican, Italian, Turkish, Chinese]',
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
                        $ref: '#/components/schemas/CreateRecipeInput',
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
          description: 'Execute a get request to fetch a recipe by its ID ',
          security: [{ bearerAuth: [] }],

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
                        $ref: '#/components/schemas/CreateRecipeOutput',
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
          security: [{ bearerAuth: [] }],

          requestBody: {
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    uploaded_image: {
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
                      success: {
                        type: 'boolean',
                        default: true,
                      },
                      updatedRecipe: {
                        type: 'Object',
                        $ref: '#/components/schemas/CreateRecipeResponse',
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
          security: [{ bearerAuth: [] }],

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
const swaggerSpecs = swaggerJsDoc(options);

export function swaggerDocs(app: Express, port: number) {
  // Swagger page
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

  // Docs in JSON format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-type', 'application/json');
    res.send(swaggerSpecs);
  });

  Logger.info(`Docs available at http://localhost:${port}`);
}
