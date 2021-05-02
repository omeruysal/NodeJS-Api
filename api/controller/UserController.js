const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {  //Ilk once mail bilgisini kullanarak user olup olmadigini kontrol ederiz
        return res.status(409).json({
          message: "Mail exists"
        });
      } else { //User yok ise sifreyi hashleriz
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else { //hashli sifre ile yeni bir user olustururuz
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save() //Mongoya ekleme
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.login = (req, res, next) => {
  User.find({ email: req.body.email }) //find methodu kullandigimiz icin user bilgisi array olarak gelir
    .exec()
    .then(user => {
      if (user.length < 1) { //Bu maile ait bir user yok ise 401 dondururuz ve detayli bilgi vermekten kaciniriz
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => { // Mail dogru ise gelen sifre ile dbdeki sifreyi bcrypt compare fonksiyonu ile karsilastiririz
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign( // password dogru ise user a gonderecegimiz tokeni olusturuz. 1 saat gecerli
            {
              email: user[0].email,
              userId: user[0]._id
            },
            "secret",
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};