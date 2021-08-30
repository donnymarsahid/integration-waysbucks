const { cart, transaction, product, toppingProduct, topping, user } = require('../../models');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await transaction.findAll({
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password', 'status'],
          },
        },
        {
          model: cart,
          as: 'cart',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
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
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idProduct', 'idUser', 'idOrder', 'price'],
      },
    });
    res.send({
      status: 'success',
      data: {
        transactions,
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

exports.addTransaction = async (req, res) => {
  try {
    const { status, idOrder } = req.body;
    const idUser = req.user.id;

    const findOrder = await cart.findOne({
      where: {
        id: idOrder,
      },
    });
    if (findOrder) {
      await transaction.create({
        idOrder: idOrder,
        status: status,
        idUser,
      });
    }

    const resultTransaction = await transaction.findOne({
      where: {
        idOrder: idOrder,
      },
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password', 'status'],
          },
        },
        {
          model: cart,
          as: 'cart',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
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
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idProduct', 'idUser', 'idOrder', 'price'],
      },
    });

    res.send({
      status: status,
      data: {
        transaction: resultTransaction,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUserTransaction = async (req, res) => {
  try {
    const idUser = req.params.id;
    const userTransaction = await transaction.findOne({
      where: {
        id: idUser,
      },
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password', 'status'],
          },
        },
        {
          model: cart,
          as: 'cart',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
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
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idProduct', 'idUser', 'idOrder', 'price'],
      },
    });
    res.send({
      status: 'success',
      data: {
        userTransaction,
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

exports.deleteTransaction = async (req, res) => {
  try {
    const idOrder = req.params.id;
    await transaction.destroy({
      where: {
        id: idOrder,
      },
    });
    res.send({
      status: 'success',
      data: {
        id: idOrder,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
