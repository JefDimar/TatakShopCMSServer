# ecommerce-CMS-server

Server REST API untuk webpage ecommerce

##RESTful endpoints

- #### Url

  For Admin Only:

  - `/login` POST
  - `/products` GET
  - `/products` POST
  - `/products/:id` GET
  - `/products/:id` PUT
  - `/products/:id` PATCH
  - `/products/:id` DELETE

  For Customer Side:

  - `/register` POST
  - `/login` POST
  - `/products` GET
  - `/carts` GET
  - `/carts/:productId` POST
  - `/carts/:cartId` PUT
  - `/carts/:cartId` DELETE

  ## POST /login

  > Login untuk admin

  _Request Body_

  ```json
  {
    "email": "admin@mail.com",
    "password": "1234"
  }
  ```

  _Response (200 - Ok)_

  ```json
  {
    "message": "Welcome back admin, have a nice day!",
    "access_token": "<by default generated by system>"
  }
  ```

  _Response (401 - Unauthorized)_

  ```json
  {
    "message": "Invalid email or password, check again"
  }
  ```

  _Response (500 - Internal Server Error)_

  ```json
  {
    "message": "Internal Server Error"
  }
  ```

  ### GET /products

  > Mendapatkan semua list products yang ada di database

  _Request body_

  ```
    "not needed"
  ```

  _Request headers_

  ```json
  {
    "access_token": "<token generated default by system when login>"
  }
  ```

  _Response (200 - Ok)_

  ```json
  [
    {
      "id": "<default generated by database>",
      "name": "<posted name of products>",
      "image_url": "<posted image_url of products>",
      "price": "<posted price of products>",
      "stock": "<posted stock of products>"
    },
    {
      "id": "<default generated by database>",
      "name": "<posted name of products>",
      "image_url": "<posted image_url of products>",
      "price": "<posted price of products>",
      "stock": "<posted stock of products>"
    }
  ]
  ```

  _Response (401 - Unauthorized)_

  ```json
  {
    "message": "Please login first"
  }
  ```

  _Response (500 - Internal Server Error)_

  ```json
  {
    "message": "Internal Server Error"
  }
  ```

  ### POST /products

  > Menambahkan products ke database

  _Request body_

  ```json
  {
    "name": "name of products you want to store",
    "image_url": "photos of your products you want to store",
    "price": "price of your products <must be greater than zero>",
    "stock": "stock of your products <must be greater than zero>",
    "message": "Success to add product to database!"
  }
  ```

  _Request headers_

  ```json
  {
    "access_token": "<token generated default by system when login>"
  }
  ```

  _Response (201 - Created)_

  ```json
  {
    "id": "<default generated by database>",
    "name": "<posted name of products>",
    "image_url": "<posted image_url of products>",
    "price": "<posted price of products>",
    "stock": "<posted stock of products>",
    "message": "Success to add product to database!"
  }
  ```

  _Response (400 - Bad Request)_

  ```json
  [
    {
      "message": "<Type of field you missing or not correct>"
    },
    {
      "message": "<Type of field you missing or not correct>"
    }
  ]
  ```

  _Response (500 - Internal Server Error)_

  ```json
  {
    "message": "Internal Server Error"
  }
  ```

  ### GET /products/:id

  > Menampilkan products berdasarkan id product tersebut

  _Request body_

  ```
    "not needed"
  ```

  _Request params_

  ```json
  {
    "id": "[INTEGER]"
  }
  ```

  _Request headers_

  ```json
  {
    "access_token": "<token generated default by system when login>"
  }
  ```

  _Response (200 - Ok)_

  ```json
  {
    "id": "<default generated by database>",
    "name": "<posted name of products>",
    "image_url": "<posted image_url of products>",
    "price": "<posted price of products>",
    "stock": "<posted stock of products>"
  }
  ```

  _Response (404 - Not Found)_

  ```json
  {
    "message": "Product you requested not found"
  }
  ```

  _Response (500 - Internal Server Error)_

  ```json
  {
    "message": "Internal Server Error"
  }
  ```

  ### PUT /products/:id

  > Mengubah keseluruhan field yang ada di products berdasarkan id product

  _Request body_

  ```json
  {
    "name": "Updated name of products",
    "image_url": "Updated photos url of products",
    "price": "Updated price of products <Must be greater than zero>",
    "stock": "Updated stock of products <Must be greater than zero>"
  }
  ```

  _Request params_

  ```json
  {
    "id": "[INTEGER]"
  }
  ```

  _Request headers_

  ```json
  {
    "access_token": "<token generated default by system when login>"
  }
  ```

  _Response (201 - Created)_

  ```json
  {
    "message": "Success data has been updated successfully"
  }
  ```

  _Response (404 - Not Found)_

  ```json
  {
    "message": "Product you requested not found"
  }
  ```

  _Response (400 - Bad Request)_

  ```json
  [
    {
      "message": "<Type of field you missing or not correct>"
    },
    {
      "message": "<Type of field you missing or not correct>"
    }
  ]
  ```

  _Response (500 - Internal Server Error)_

  ```json
  {
    "message": "Internal Server Error"
  }
  ```

  ### PATCH /products/:id

  > Mengubah field price dan stock yang ada di products berdasarkan id product

  _Request body_

  ```json
  {
    "price": "Updated price of products <Must be greater than zero>",
    "stock": "Updated stock of products <Must be greater than zero>"
  }
  ```

  _Request params_

  ```json
  {
    "id": "[INTEGER]"
  }
  ```

  _Request headers_

  ```json
  {
    "access_token": "<token generated default by system when login>"
  }
  ```

  _Response (201 - Created)_

  ```json
  {
    "message": "Success data has been updated successfully"
  }
  ```

  _Response (404 - Not Found)_

  ```json
  {
    "message": "Product you requested not found"
  }
  ```

  _Response (400 - Bad Request)_

  ```json
  [
    {
      "message": "<Type of field you missing or not correct>"
    },
    {
      "message": "<Type of field you missing or not correct>"
    }
  ]
  ```

  _Response (500 - Internal Server Error)_

  ```json
  {
    "message": "Internal Server Error"
  }
  ```

  ### DELETE /products/:id

  > Menghapus products yang sudah tidak diperlukan / stock habis

  _Request body_

  ```
    "not needed"
  ```

  _Request params_

  ```json
  {
    "id": "[INTEGER]"
  }
  ```

  _Request headers_

  ```json
  {
    "access_token": "<token generated default by system when login>"
  }
  ```

  _Response (200 - Ok)_

  ```json
  {
    "message": "Products has been deleted"
  }
  ```

  _Response (404 - Not Found)_

  ```json
  {
    "message": "Error not found"
  }
  ```

  _Response (500 - Internal Server Error)_

  ```json
  {
    "message": "Internal Server Error"
  }
  ```

      ## POST /register

  > Regster untuk customer

  _Request Body_

  ```json
  {
    "email": "blabla@mail.com",
    "password": "******** <minimum 6 characters>"
  }
  ```

  _Response (200 - Ok)_

  ```json
  {
    "message": "Welcome back <user>, have a nice day!",
    "access_token": "<by default generated by system>",
    "user": "same as email user"
  }
  ```

  _Response (401 - Unauthorized)_

  ```json
  {
    "message": "Invalid email or password, check again"
  }
  ```

  _Response (500 - Internal Server Error)_

  ```json
  {
    "message": "Internal Server Error"
  }
  ```

  ### GET /carts

  > Mendapatkan semua list carts yang ada di database menurut id customer

  _Request body_

  ```
    "not needed"
  ```

  _Request headers_

  ```json
  {
    "access_token": "<token generated default by system when login>"
  }
  ```

  _Response (200 - Ok)_

  ```json
  [
    {
      "id": "<id carts>",
      "productId": "<id products>",
      "userId": "<id user who create>",
      "quantity": "<quantity to buy a product>",
      "status": "<status boolean for checkout>",
      "createdAt": "<generated by database>",
      "updatedAt": "<generated by database>",
      "Product": {
        "id": "<id products>",
        "name": "<name products>",
        "image_url": "<image url products>",
        "price": "<price products>",
        "stock": "<stock products>",
        "createdAt": "<generated by database>",
        "updatedAt": "<generated by database>"
      }
    },
    {
      "id": "<id carts>",
      "productId": "<id products>",
      "userId": "<id user who create>",
      "quantity": "<quantity to buy a product>",
      "status": "<status boolean for checkout>",
      "createdAt": "<generated by database>",
      "updatedAt": "<generated by database>",
      "Product": {
        "id": "<id products>",
        "name": "<name products>",
        "image_url": "<image url products>",
        "price": "<price products>",
        "stock": "<stock products>",
        "createdAt": "<generated by database>",
        "updatedAt": "<generated by database>"
      }
    }
  ]
  ```

  _Response (401 - Unauthorized)_

  ```json
  {
    "message": "Please login first"
  }
  ```

  _Response (500 - Internal Server Error)_

  ```json
  {
    "message": "Internal Server Error"
  }
  ```

### POST /carts

> Menambahkan carts ke database

_Request body_

```json
{
  "quantity": "how much quantity you want to purchase products"
}
```

_Request headers_

```json
{
  "access_token": "<token generated default by system when login>"
}
```

_Response (201 - Created)_

```json
[
  {
    "id": "<generated default by system>",
    "name": "<name products>",
    "image_url": "<image url products>",
    "price": "<price products>",
    "stock": "<stock products>",
    "createdAt": "<generated by database>",
    "updatedAt": "<generated by database>"
  }
]
```

_Response (400 - Bad Request)_

```json
[
  {
    "message": "<Type of field you missing or not correct>"
  },
  {
    "message": "<Type of field you missing or not correct>"
  }
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

### PUT /carts/:cartId

  > Mengubah quantity field yang ada di cart berdasarkan id cart

  _Request body_

  ```json
  {
    "quantity": "Updated quantity of carts"
  }
  ```

  _Request params_

  ```json
  {
    "cartId": "[INTEGER]"
  }
  ```

  _Request headers_

  ```json
  {
    "access_token": "<token generated default by system when login>"
  }
  ```

  _Response (201 - Created)_

  ```json
  {
    "message": "Success data has been updated successfully"
  }
  ```

  _Response (404 - Not Found)_

  ```json
  {
    "message": "Product you requested not found"
  }
  ```

  _Response (400 - Bad Request)_

  ```json
  [
    {
      "message": "<Type of field you missing or not correct>"
    },
    {
      "message": "<Type of field you missing or not correct>"
    }
  ]
  ```

  _Response (500 - Internal Server Error)_

  ```json
  {
    "message": "Internal Server Error"
  }
  ```

  ### DELETE /carts/:cartId

  > Menghapus carts yang sudah tidak diinginkan

  _Request body_

  ```
    "not needed"
  ```

  _Request params_

  ```json
  {
    "cartId": "[INTEGER]"
  }
  ```

  _Request headers_

  ```json
  {
    "access_token": "<token generated default by system when login>"
  }
  ```

  _Response (200 - Ok)_

  ```json
  {
    "message": "Carts has been deleted successfully"
  }
  ```

  _Response (404 - Not Found)_

  ```json
  {
    "message": "Error not found"
  }
  ```

  _Response (500 - Internal Server Error)_

  ```json
  {
    "message": "Internal Server Error"
  }
  ```