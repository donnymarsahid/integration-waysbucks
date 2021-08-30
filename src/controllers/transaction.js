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
                    attributes: [],
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

    const path = process.env.IMG_URL;
    const upload = req.file.filename;
    const imageUpload = path + upload;
    if (findOrder) {
      await transaction.create({
        idOrder: idOrder,
        status: status,
        idUser,
        attachment: imageUpload,
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
                    attributes: [],
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
                    attributes: [],
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

exports.updateTransaction = async (req, res) => {
  try {
    const idOrder = req.params.id;
    await transaction.update(
      { ...req.body },
      {
        where: {
          id: idOrder,
        },
      }
    );

    const resultTransaction = await transaction.findOne({
      where: {
        id: idOrder,
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
                    attributes: [],
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
      status: 'success update transaction',
      data: {
        transaction: resultTransaction,
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
