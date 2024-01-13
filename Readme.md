# Recipe Rest API
 Recipe API is a Rest API that offers the ability to perform CRUD operations against a MongoDB instance and a variety of features.
 

## Features
 - Filtering response data  using Query Params (sort, limit, search,...)
 - Request payload validation
 - Query params validation
 - Params validation
 - Create, Read, Update and  Delete operations
 - Image upload using Multer
 - Custom error handling using express-validator
## How To use
```bash
# Clone this repository
$  git clone https://github.com/MedtheVorg/Recipes_Rest_Api.git

# Go into the repository
$ cd Recipes_Rest_Api

# install dependencies
$ npm install

# add .env file
 - Create a .env file in the root directory and add  the following environment variables : 
  PORT = ""
  DB_USERNAME =""
  DB_PASSWORD =""

# Run the server
$ npm run server
```

## Routes
Available Routes
```
GET    /Recipes
GET    /Recipes/:id
POST   /Recipes
PATCH  /Recipes/:id
DELETE /Recipes/:id
```


## Filtering Params
  the api currently offers the following query params to filter data : 
  - Search by title  =>  `?title=` (exact value)   
  - Search by description  =>  `?description=`  (exact value) 
  - Search by rating  =>  `?rating=1` | `?rating_gt=` | `?rating_lt=`    (by default rating is between 1 and 5)
  - Search by category  =>  `?category=`  in (Moroccan, Mexican, Italian, Turkish, Chinese)   
  - Sort by a field  =>  `?sort=target,asc` by default  sorting is  in asc order  (use desc to reverse the order)   
  - limit   =>  `?limit=10`  limit the  received documents number 
  - Global search   =>  `?search=`  perform a global search on multiple fields
## Server configuration   
 - Using Multer library the server provides the ability to store images locally in the uploads folder while the database tracks information about the uploaded image.
 - Cors Policy is handled using the cors library to allow requests from any origin.
 - Query parsing is handled using the URLSearchParams class for its simple interface and the elimination of the default parsing syntax provided by the express qs module.
 - the server was  built with validation in mind whether its request payload, filtering query params or  uploaded files.


## Contributing
If you'd like to contribute code, documentation, or other enhancements, please follow these general steps:
### How to Contribute
1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and test them thoroughly.
4. Create a pull request with a clear title and description.

Thank you for helping improve this project!

## License

This project uses the [MIT License](https://mit-license.org/). The MIT License (MIT)
Copyright © 2024 <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


# links
[**REACT**](./src/index.ts)