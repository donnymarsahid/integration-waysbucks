const { user, profile, product, topping, toppingProduct } = require('../../models');

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      include: [
        {
          model: profile,
          as: 'profile',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'idUser'],
          },
        },
        {
          model: product,
          as: 'products',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: {
            model: topping,
            as: 'toppings',
            through: {
              model: toppingProduct,
              as: 'junction',
            },
          },
        },
      ],
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });

    res.send({
      status: 'success',
      data: {
        users,
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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await user.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: 'success',
      data: {
        id,
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

exports.addProfile = async (req, res) => {
  const idUser = req.user.id;
  console.log(idUser);
  const { category: categoryName, ...data } = req.body;
  try {
    await profile.create({ ...data, image: req.file.filename, idUser });
    res.send({
      status: 'success',
      message: 'Add profile finished',
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};
