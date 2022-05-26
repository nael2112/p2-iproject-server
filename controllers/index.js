const axios = require("axios");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const {User, Watchlist} = require("../models")


class Controller {
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

  static async signup(req, res, next) {
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
        username: foundUser.username,
      };
      const accessToken = sign(payload, "secret");

      res.status(200).json({
        access_token: accessToken,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
