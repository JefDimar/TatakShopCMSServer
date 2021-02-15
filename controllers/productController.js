const { Product } = require("../models");

class ProductController {
  static getAll(req, res, next) {
    Product.findAll({
      order: [["id", "DESC"]],
    })
      .then((data) => {
        const output = [];
        data.forEach((element) => {
          output.push({
            id: element.id,
            name: element.name,
            image_url: element.image_url,
            price: element.price,
            stock: element.stock,
          });
          res.status(200).json(output);
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static create(req, res, next) {
    const input = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
    };

    if (input.price < 0 || input.stock < 0) {
      next({
        name: "Error price / stock, min > 0",
      });
    } else {
      Product.create(input)
        .then((data) => {
          delete data.createdAt;
          delete data.updatedAt;
          data["message"] = "Success to add product to database!";
          res.status(201).json(data);
        })
        .catch((err) => {
          next(err);
        });
    }
  }

  static getById(req, res, next) {
    const id = req.params.id;

    Product.findOne({ where: { id } })
      .then((data) => {
        if (!data) {
          next({
            name: "Data not found",
          });
        } else {
          delete data.createdAt;
          delete data.updatedAt;
          res.status(200).json(data);
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static edit(req, res, next) {
    const id = req.params.id;
    const input = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
    };

    if (input.price < 0 || input.stock < 0) {
      next({
        name: "Error price / stock, min > 0",
      });
    } else {
      Product.update(input, {
        where: { id },
        returning: true,
      })
        .then((data) => {
          if (data[0] == 0) {
            next({
              name: "Data not found",
            });
          } else {
            res.status(201).json({
              message: "Success data has been updated successfully",
            });
          }
        })
        .catch((err) => {
          next(err);
        });
    }
  }

  static setPrice(req, res, next) {
    const id = req.params.id;
    const input = {
      price: req.body.price,
      stock: req.body.stock,
    };

    if (input.price < 0 || input.stock < 0) {
      next({
        name: "Error price / stock, min > 0",
      });
    } else {
      Product.update(input, {
        where: { id },
        returning: true,
      })
        .then((data) => {
          if (data[0] == 0) {
            next({
              name: "Data not found",
            });
          } else {
            res.status(200).json({
              message: "Success data has been updated successfully",
            });
          }
        })
        .catch((err) => {
          next(err);
        });
    }
  }

  static delete(req, res, next) {
    const id = req.params.id;

    Product.destroy({ where: { id } })
      .then((data) => {
        if (!data) {
          next({
            name: "Data not found",
          });
        } else {
          res.status(200).json({
            message: "Products has been deleted",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = ProductController;
