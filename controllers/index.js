const axios = require("axios");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const {User, Watchlist} = require("../models")


class Controller {
  static async getNews(req, res, next) {
    try {
      let response = await axios({
        method: "get",
        url: "https://gnews.io/api/v4/search?q=crypto&token=e429246aae9f592aca06c033041b4ce6&max=3&lang=en"
      })

      res.status(200).json(response.data)
    } catch (error) {
      next(error)
    }
  }
  static async getCoins(req, res, next) {
    try {
      const { page = 1 } = req.query;
      let response = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`,
      });

      res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  }
  

  static async coinDetail(req, res, next) {
    try {
      const { coin } = req.query;
      let response = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      });

      res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  }

  static async compareDetails(req, res, next) {
    try {
      const {coin1, coin2} = req.query
    
      let response1 = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/${coin1}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      })
      let response2 = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/${coin2}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      });
  
      res.status(200).json({
        coin1: response1.data,
        coin2: response2.data
      })
    } catch (error) {
      next(error)
    }

  }

  static async coinHistory(req, res, next) {
    try {
      const { coin, dates = 1 } = req.query;
      let response = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${dates}`,
      });


      let prices = response.data.prices.map((price) => {
        let date = new Date(price[0])
        let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM`
        return dates==1?[time, price[1]]:[date, price[1]]
      });

      res.status(200).json(prices);
    } catch (error) {
      next(error);
    }
  }

  static async compareHistory(req, res, next) {
    try {
      const {coin1 = 'bitcoin', coin2 = 'ethereum', dates = 1} = req.query
    
      let response1 = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/${coin1}/market_chart?vs_currency=usd&days=${dates}`,
      })
      let response2 = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/${coin2}/market_chart?vs_currency=usd&days=${dates}`,
      });
      
      let prices1 = response1.data.prices.map((price) => {
        let date = new Date(price[0])
        return [date, price[1]]
      });

      let prices2 = response2.data.prices.map((price) => {
        let date = new Date(price[0])
        return [date, price[1]]
      });

      res.status(200).json([
        {name: coin1, data: prices1},
        {name: coin2, data: prices2},
      ])
    } catch (error) {
      next(error)
    }

  }

  static async register(req, res, next) {
    try {
      const {username, email, password} = req.body 
      if (!username) {
        throw new Error("Username cannot be empty")
      }
      if (!email) {
        throw new Error("Email cannot be empty")
      }
      if (!password) {
        throw new Error("Password cannot be empty")
      }

      const newUser = await User.create({
        username,
        email,
        password
      })


      res.status(201).json({id: newUser.id, username: newUser.username})
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const foundUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!foundUser) {
        throw new Error("Invalid Email/Password");
      }
      const correctPassword = compareSync(password, foundUser.password);

      if (!correctPassword) {
        throw new Error("Invalid Email/Password");
      }

      const payload = {
        id: foundUser.id,
        email: foundUser.email,
      };
      const accessToken = sign(payload, "secret");

      res.status(200).json({
        username: foundUser.username,
        access_token: accessToken,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getWatchlist(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          id: req.additionalData.id
        },
        include: {
          model: Watchlist,
          required: false
        }
      })
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async addWatchlist(req, res, next) {
    try {
      const {coin} = req.body
      const newCoin = await Watchlist.create({
        UserId: req.additionalData.id,
        coin: coin
      })

      res.status(201).json({message: "Coin has been added to your watchlist"})
    } catch (error) {
      next(error)
    }
  }

  static async deleteWatchlist(req, res, next) {
    try {
      const {coin} = req.body
      const removedCoin = await Watchlist.destroy({
        where: {
          UserId: req.additionalData.id,
          coin: coin
        }
      })

      res.status(201).json({message: "Coin has been removed from your watchlist"})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller;
