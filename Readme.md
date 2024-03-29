
***<h1 align="center" style="border:none;text-decoration:underline">Recipe REST API</h1>***


# Overview
 Recipe API is a Rest API that offers the ability to perform CRUD operations against a MongoDB instance and a variety of features.

# Technologies
  this project was built using the following technologies :
  - [**TypeScript**](https://www.typescriptlang.org/):  Superset of JavaScript that adds static typing to the language.
  - [**NodeJs**](https://nodejs.org/) : Server-side JavaScript runtime built on Chrome's V8 JavaScript engine.
  - [**ExpressJs**](https://expressjs.com/) : Minimalist web application framework for Node.js.
  - [**MongoDB**](https://www.mongodb.com/) : NoSQL database system, using a document-oriented data model.
  - [**Mongoose**](https://mongoosejs.com/) : MongoDB object modeling for Node.js.
 

  
  You can refer to [package.json](./package.json) file for more details
 
<br/>

# Features
 - Filtering response data  using Query Params (sort, limit, search,...)
 - Request payload validation
 - Query params validation
 - Params validation
 - Create, Read, Update and  Delete operations
 - Image upload using Multer
 - Custom error handling using express-validator
 - Protected routes with JWT Authentication strategy

<br/>

# How To use
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
  REMOTE_DB_CONNECTION_STRING = "";
  LOCAL_DB_CONNECTION_STRING = "";
# generate Pem encoded keys
  you have two options : 
  - generate your won keys and store them in the keys folder files (private_key.pem and public_key.pem)
  - or you can use the function in the /src/middlewares/authentication/PEM-ENCODED-KEYS.ts file from line 8 to 18 to generate and store pem encoded key pairs for you.

# Run the server
$ npm run server

```
<br/>

# Documentation
  swagger was used to document and test the api, you can visit the http://localhost:4500/api-docs end point to test the api.
<details open>
  <summary>docs home page</summary>
    <img src="./swaggerui.png" />
    
</details>

  if you instead prefer to use Postman you can visit the http://localhost:4500/docs.json endpoint  and import its result to postman
<br/>


# Routes
Available Routes
```
POST   /login (log in as a user)
POST   /register (register a user)
GET    /Recipes
GET    /Recipes/:id
POST   /Recipes
PATCH  /Recipes/:id
DELETE /Recipes/:id
```
<br/>

# Filtering Params
  the api currently offers the following query params to filter data : 
  - Search by title  =>  `?title=` (exact value)   
  - Search by description  =>  `?description=`  (exact value) 
  - Search by rating  =>  `?rating=1` | `?rating_gt=` | `?rating_lt=`    (by default rating is between 1 and 5)
  - Search by category  =>  `?category=`  in (Moroccan, Mexican, Italian, Turkish, Chinese)   
  - Sort by a field  =>  `?sort=target,asc` by default  sorting is  in asc order  (use desc to reverse the order)   
  - limit   =>  `?limit=10`  limit the  received documents number 
  - Global search   =>  `?search=`  perform a global search on multiple fields

<br/>

# Server configuration   
 - Using Multer library the server provides the ability to store images locally in the uploads folder while the database tracks information about the uploaded image.
 - Cors Policy is handled using the cors library to allow requests from any origin.
 - Query parsing is handled using the URLSearchParams class for its simple interface and the elimination of the default parsing syntax provided by the express qs module.
 - the server was  built with validation in mind whether its request payload, filtering query params,uploaded files or user credentials.

<br/>

# Contributing
If you'd like to contribute code, documentation, or other enhancements, please follow these general steps:

## How to Contribute
1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and test them thoroughly.
4. Create a pull request with a clear title and description.

Thank you for helping improve this project!

<br/>

# License

This project uses the [MIT License](https://mit-license.org/). The MIT License (MIT)
Copyright © 2024 <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


