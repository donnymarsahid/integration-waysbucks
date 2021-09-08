const { order, transaction, user, toppingOrder, topping, product, cart } = require('../../models');

exports.getTransaction = async (req, res) => {
  try {
    console.log(req.user.id);
    const transactionUser = await user.findAll({
      where: {
        id: req.user.id,
      },
      include: [
        {
          model: transaction,
          as: 'transactions',
          attributes: {
            exclude: ['createdAt'],
          },
          include: [
            {
              model: order,
              as: 'orders',
              attributes: {
                exclude: ['createdAt'],
              },
              include: [
                {
                  model: product,
                  as: 'product',
                  attributes: {
                    exclude: ['createdAt'],
                  },
                },
                {
                  model: topping,
                  as: 'toppings',
                  through: {
                    model: toppingOrder,
                    as: 'junction',
                    attributes: [],
                  },
                  attributes: {
                    exclude: ['createdAt'],
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    res.status(200).send({
      status: 'success',
      transactionUser,
    });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
    });
    console.log(error);
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const idUser = req.user.id;
    const file = process.env.IMG_URL;
    const uploadFile = file + req.file.filename;
    const { name, email, total, phone, posCode, address } = req.body;

    const addTransaction = await transaction.create({
      idUser,
      name,
      email,
      total,
      phone,
      posCode,
      address,
      status: 'waiting approve',
      attachment: uploadFile,
    });

    const findOrder = await order.findAll();
    const getIdOrder = findOrder.map(async (data) => {
      if (data.idTransaction === null) {
        const updateOrder = await order.update(
          { idTransaction: addTransaction.id },
          {
            where: {
              id: data.id,
              idTransaction: null,
            },
          }
        );
      }
    });

    const findCart = await cart.findAll();
    const getIdCart = findCart.map((data) => data.id);
    const deleteCart = await cart.destroy({ where: { id: getIdCart } });

    res.status(200).send({
      status: 'success',
      id: addTransaction,
    });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
    });
    console.log(error);
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await user.findAll({
      include: [
        {
          model: transaction,
          as: 'transactions',
          attributes: {
            exclude: ['createdAt'],
          },
          include: [
            {
              model: order,
              as: 'orders',
              attributes: {
                exclude: ['createdAt'],
              },
              include: [
                {
                  model: product,
                  as: 'product',
                  attributes: {
                    exclude: ['createdAt'],
                  },
                },
                {
                  model: topping,
                  as: 'toppings',
                  through: {
                    model: toppingOrder,
                    as: 'junction',
                    attributes: [],
                  },
                  attributes: {
                    exclude: ['createdAt'],
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    res.status(200).send({
      status: 'success',
      transactions,
    });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
    });
    console.log(error);
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const idTransaction = req.params.id;
    const deleteTransaction = await transaction.destroy({
      where: {
        id: idTransaction,
      },
    });

    res.status(200).send({
      status: 'success',
      id: idTransaction,
    });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
    });
    console.log(error);
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const idTransaction = req.params.id;
    await transaction.update(
      { ...req.body },
      {
        where: {
          id: idTransaction,
        },
      }
    );

    res.send({
      status: 'success',
      data: {
        idTransaction,
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
