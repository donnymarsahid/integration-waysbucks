const { product, topping, toppingProduct, cart } = require('../../models');

exports.getCarts = async (req, res) => {
  try {
    const carts = await cart.findAll({
      include: [
        {
          model: product,
          as: 'product',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'status', 'idUser'],
          },
          include: [
            {
              model: topping,
              as: 'toppings',
              through: {
                model: toppingProduct,
                as: 'junction',
                attributes: [],
              },
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idProduct'],
      },
    });
    res.send({
      status: 'success',
      data: {
        carts,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.addCart = async (req, res) => {
  const idProduct = req.params.id;
  const { idTopping, quantity } = req.body;

  try {
    idTopping.map(async (data) => {
      await toppingProduct.create({
        idProduct: idProduct,
        idTopping: data,
      });
    });
    await cart.create({
      idProduct: idProduct,
      quantity,
    });

    const cartResult = await cart.findOne({
      where: {
        idProduct: idProduct,
      },
      include: [
        {
          model: product,
          as: 'product',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'status', 'idUser'],
          },
          include: [
            {
              model: topping,
              as: 'toppings',
              through: {
                model: toppingProduct,
                as: 'junction',
                attributes: [],
              },
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idProduct'],
      },
    });
    res.send({
      status: 'success add cart',
      data: {
        cart: cartResult,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const idProduct = req.params.id;
    await cart.destroy({
      where: {
        id: idProduct,
      },
    });
    res.send({
      status: 'success',
      data: {
        id: idProduct,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
