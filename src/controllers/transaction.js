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
    const { name, email, total, phone, posCode, address, attachment } = req.body;

    const addTransaction = await transaction.create({
      idUser,
      name,
      email,
      total,
      phone,
      posCode,
      address,
      status: 'waiting approve',
      attachment,
    });

    const findOrder = await order.findAll();
    const getIdOrder = findOrder.map((data) => data.id);

    const updateOrder = await order.update(
      { idTransaction: addTransaction.id },
      {
        where: {
          id: getIdOrder,
        },
      }
    );

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
