const { product, topping, toppingProduct, cart } = require('../../models');

exports.getCarts = async (req, res) => {
  try {
    const carts = await cart.findAll({
      include: [
        {
          model: product,
          as: 'product',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            {
              model: topping,
              as: 'toppings',
              through: {
                model: toppingProduct,
                as: 'junction',
              },
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
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
  const { idTopping, idProduct, quantity } = req.body;

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

    res.send({
      orders: {
        idTopping,
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
