const mongoose = require("mongoose");
const Product = require("../models/Product");


exports.get_all =  (req, res, next) => {
    Product.find()
      //  .select("name price") getirmek istedigimiz alanlari bu sekilde belirtebiliriz
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error })
        })

}

exports.get_by_id =  (req, res, next) => {
    const id = req.params.id;

    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {

                res.status(200).json(doc)
            }
            else {
                res.status(404).json({ message: 'No valid entry found for provided ID' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error })
        })



}

exports.create =  (req, res, next) => {
  const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    product
    .save()
    .then(result => {
        res.status(201).json({
            message: "Post request to /products",
            createdProduct: product
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error : err
        })
    });

}

exports.delete =  (req, res, next) => {
    const id = req.params.id;

    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error
            })
        })
}