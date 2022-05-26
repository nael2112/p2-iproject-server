List of Available Endpoints:

- `GET /news`
- `GET /markets`
- `GET /compare`
- `GET /coin`
- `GET /coin/history`
- `GET /compare/history`
- `POST /login`
- `POST /register`
- `GET /watchlist`
- `POST /watchlist`
- `DELETE /watchlist`

### POST /register

#### Description

- Register a new user

#### Response

_201 - OK_

- Body
  ```json
  {
    "statusCode": 201,
    "data": {
      "id": Integer,
      "username": String,
    }
  }
  ```

_400 - Validation Error_

- Body
  ```json
  {
    "statusCode": 400,
    "message": [ errors ]
  }
  ```

### POST /login

#### Description

- Login to account

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "email": String,
    "password": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "username": String,
    "access_token": String
  }
  ```

_401 - Not Found_

- Body
  ```json
  {
    "statusCode": 401,
    "message": "Invalid username / password"
  }
  ```

### GET /news

#### Description

- Lists all the products

#### Response

_200 - OK_

- Body
  ```json
  {
    "totalArticles": Integer,
    "articles": [ Object ]
  }
  ```

### GET /markets

#### Description

- Lists 10 cryptocurrencies

#### Response

_200 - OK_

- Body

  ```json
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    "current_price": 29174,
    "market_cap": 556806530202,
    "market_cap_rank": 1,
    "fully_diluted_valuation": 613802087591,
    "total_volume": 29884911179,
    "high_24h": 29978,
    "low_24h": 28412,
    "price_change_24h": -672.9836751287767,
    "price_change_percentage_24h": -2.25479,
    "market_cap_change_24h": -11951202264.411377,
    "market_cap_change_percentage_24h": -2.10128,
    "circulating_supply": 19050012,
    "total_supply": 21000000,
    "max_supply": 21000000,
    "ath": 69045,
    "ath_change_percentage": -57.66707,
    "ath_date": "2021-11-10T14:24:11.849Z",
    "atl": 67.81,
    "atl_change_percentage": 43004.41215,
    "atl_date": "2013-07-06T00:00:00.000Z",
    "roi": null,
    "last_updated": "2022-05-26T14:20:06.340Z"
  },
  ...

  ```

### GET /coin

#### Description

- Get coin information

#### Request

- Query
  ```
  coin: String
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "asset_platform_id": null,
    "platforms": {
        "": ""
    },
    "block_time_in_minutes": 10,
    "hashing_algorithm": "SHA-256",
    "categories": [
        "Cryptocurrency"
    ],
    ...
  }

  ```

### GET /coin/history
#### Description

- Get coin price history

#### Request

- Query
  ```
  coin: String
  ```

#### Response

_200 - OK_

- Body

  ```json
  [
    [
        "9:24 PM",
        29846.908820192704
    ],
    [
        "9:30 PM",
        29848.898511276697
    ],
    [
        "9:32 PM",
        29838.99714698655
    ],
    ...
  ]

  ```



### GET /compare

#### Description

- Get 2 coins information

#### Request

- Query
  ```
  coin1: String
  coin2: String
  ```

#### Response

_200 - OK_

- Body

  ```json
  { coin1: {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "asset_platform_id": null,
    "platforms": {
        "": ""
    },
    "block_time_in_minutes": 10,
    "hashing_algorithm": "SHA-256",
    "categories": [
        "Cryptocurrency"
    ],
    ...
  },
  coin2 : {

  }

  }
  ```

### GET /compare/history

#### Description

- Get 2 coins information

#### Request

- Query
  ```
  coin1: String
  coin2: String
  ```

#### Response

_200 - OK_

- Body

  ```json
  { coin1: [
    [
        "9:24 PM",
        29846.908820192704
    ],
    [
        "9:30 PM",
        29848.898511276697
    ],
    [
        "9:32 PM",
        29838.99714698655
    ],
    ...
  ],
  coin2: [
    ...
  ]
    ...
  },
  coin2 : {

  }

  }
  ```




### GET /watchlist

#### Description

- Get the watchlist of a certain user

#### Request

- Headers
  ```json
  {"access_token": String}
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "id": 1,
    "username": "david.rawatan",
    "email": "12345@mail.com",
    "password": "$2b$10$bisLXSHq9Qr413OsGOMLxO.0L82MvEFldtuMbRmD6XZAkVM5V7WIy",
    "createdAt": "2022-05-26T07:37:48.346Z",
    "updatedAt": "2022-05-26T07:37:48.346Z",
    "Watchlists": [
        {
            "id": 4,
            "UserId": 1,
            "coin": "ethereum",
            "createdAt": "2022-05-26T09:37:19.895Z",
            "updatedAt": "2022-05-26T09:37:19.895Z"
        },
        {
            "id": 5,
            "UserId": 1,
            "coin": "tether",
            "createdAt": "2022-05-26T10:06:34.252Z",
            "updatedAt": "2022-05-26T10:06:34.252Z"
        }
    ]
  }
  ```

_401 - No Authentication_

- Body
  ```json
  {
    "statusCode": 401,
    "message": "Invalid Token"
  }
  ```

### POST /watchlist

#### Description

- Add a crypto to watchlist for a certain user

#### Request

- Headers
  ```json
  {"access_token": String}
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "message": "Coin has been added to your watchlist"
  }
  ```

_401 - No Authentication_

- Body
  ```json
  {
    "statusCode": 401,
    "message": "Invalid Token"
  }
  ```





### DELETE /watchlist

#### Description

- Delete a crypto to watchlist for a certain user

#### Request

- Headers
  ```json
  {"access_token": String}
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "message": "Coin has been removed from your watchlist"
  }
  ```

_401 - No Authentication_

- Body
  ```json
  {
    "statusCode": 401,
    "message": "Invalid Token"
  }
  ```

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "message": "Internal Server Error"
  }
  ```