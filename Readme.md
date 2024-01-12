# Recipe Rest API


## Filtering Options




## Install

```shell
npm install json-server
```

## Usage

Create a `db.json` (or `db.json5`) file


Pass it to JSON Server CLI




|

## Routes

 get the following routes:

```
GET    /Recipes
GET    /Recipes/:id
POST   /Recipes
PUT    /Recipes/:id
PATCH  /Recipes/:id
DELETE /Recipes/:id

# Same for comments
```

```
GET   /profile
PUT   /profile
PATCH /profile
```

## Params

### Conditions

- ` ` → `==`
- `lt` → `<`
- `lte` → `<=`
- `gt` → `>`
- `gte` → `>=`
- `ne` → `!=`

```
GET /posts?views_gt=9000
```

### Range

- `start`
- `end`
- `limit`

```
GET /posts?_start=10&_end=20
GET /posts?_start=10&_limit=10
```

### Paginate

- `page`
- `per_page` (default = 10)

```
GET /posts?_page=1&_per_page=25
```

### Sort

- `_sort=f1,f2`

```
GET /posts?_sort=id,-views
```

### Nested and array fields

- `x.y.z...`
- `x.y.z[i]...`

```
GET /posts?author.name=foo
GET /posts?author.email=foo
GET /posts?tags[0]=foo
```

### Embed

```
GET /posts?_embed=comments
GET /comments?_embed=post
```

## Delete

```
DELETE /posts/1
DELETE /posts/1?_embed=comments
```

## Serving static files

If you create a `./public` directory, JSON Serve will serve its content in addition to the REST API.

You can also add custom directories using `-s/--static` option.

```sh
json-server -s ./static
json-server -s ./static -s ./node_modules
```

## License

This project uses the [Fair Source License](https://fair.io/). Note: Only organizations with 3+ users need to contribute a small amount through sponsorship [sponsor](https://github.com/sponsors/typicode) for usage. This license helps keep the project sustainable and healthy, benefiting everyone.

For more information, FAQs, and the rationale behind this, visit [https://fair.io/](https://fair.io/).