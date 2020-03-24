const { Product, Order,OrderProduct } = require('../models/index.js')
const OrderController = {
    getAll(req,res){
        Order.findAll({
            include:[Product]
        })
        .then(orders=>res.send(orders))
    },
    insert(req,res){
        Order.create({
            status:"pending",
            fechaEntrega:req.body.fechaEntrega
        })
        .then(order=>{
            const products =req.body.products.map(product=>({...product,OrderId:order.id}));
            OrderProduct.bulkCreate(products);
            res.send(order);
        })
    },

    async delete(req, res) {
        await Order.destroy({
            where: {
                id: req.params.id
            }
        })
       
        res.send({
            message: 'Pedido eliminado correctamente'
        })
    },

    
}
module.exports = OrderController;


