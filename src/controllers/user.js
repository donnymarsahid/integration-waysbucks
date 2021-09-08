const { user } = require('../../models');

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      order: [['updatedAt', 'DESC']],
      attributes: {
        exclude: ['password', 'createdAt'],
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
