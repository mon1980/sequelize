'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    fechaEntrega: DataTypes.DATE,
    status: DataTypes.STRING
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsToMany(models.Product,{
      through:models.OrderProduct
    })
  };
  return Order;
};


