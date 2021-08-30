const { order, product, topping, user } = require('../../models');

exports.getOrders = async (req, res) => {
  try {
    const orders = await order.findAll({
      include: [
        {
          model: product,
          as: 'product',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'idUser', 'status'],
          },
        },
        {
          model: topping,
          as: 'topping',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser', 'idProduct', 'idTopping'],
      },
    });
    res.send({
      status: 'success',
      data: {
        orders,
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

exports.addOrder = async (req, res) => {
  try {
    const { idUser, idProduct, idTopping, quantity } = req.body;
    const newOrder = await order.create({ idUser, idProduct, idTopping, quantity });
    res.send({
      status: 'success',
      data: {
        newOrder,
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
