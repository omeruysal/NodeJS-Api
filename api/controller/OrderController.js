const mongoose = require("mongoose");
const Order = require("../models/Order");

exports.get_all = (req, res, next) => {
    Order.find()
      .select("product quantity _id")
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          orders: docs.map(doc => {
            return {
              _id: doc._id,
              product: doc.product,
              quantity: doc.quantity,
              request: {
                type: "GET",
                url: "http://localhost:3000/orders/" + doc._id
              }
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };

  exports.create =  (req, res, next) => {
    Product.findById(req.body.productId)
      .then(product => {

        if (!product) {  //Product kontrolu yapiyoruz
          return res.status(404).json({
            message: "Product not found"
          });
        }

        const order = new Order({ //Product varsa order olusturabiliriz
          _id: mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          product: req.body.productId
        });
        return order.save(); //Buradaki return sayesinde order.save().then() seklinde asagiya baglanir
      })
      .then(result => {
        console.log(result);
        res.status(201).json({ //Cliente olusturdugu orderi geri dondururuz
          message: "Order stored",
          createdOrder: {
            _id: result._id,
            product: result.product,
            quantity: result.quantity
          },
          request: {
            type: "GET",
            url: "http://localhost:3000/orders/" + result._id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

  exports.get_by_id = (req, res, next) => {
    Order.findById(req.params.id)
      .exec()
      .then(order => {
        if (!order) {
          return res.status(404).json({
            message: "Order not found"
          });
        }
        res.status(200).json({
          order: order,
          request: {
            type: "GET",
            url: "http://localhost:3000/orders"
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };
  
  exports.delete = (req, res, next) => {
    Order.remove({ _id: req.params.id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Order deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/orders",
            body: { productId: "ID", quantity: "Number" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };