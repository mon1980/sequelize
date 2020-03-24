const { Product, Tematica, ProductTematica} = require('../models/index.js')
const ProductController = {
    getAll(req,res){
        Product.findAll({
            include:[Tematica]
        })
        .then(products=>res.send(products))
    },
 
    insert(req, res) {
        Product.create({
                ...req.body
            })
            .then(product => {
                product.addTematica(req.body.tematicas);
                res.status(201).send(product)
            })
    },


    async delete(req, res) {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        })
        await ProductTematica.destroy({
        where: {
            ProductId: req.params.id
        }
    })
        res.send({
            message: 'Cuadro eliminado correctamente'
        })
    },

    update(req,res){
        Product.update({...req.body},{
            where:{
                id:req.params.id
            }
        })
        .then(product=>res.send(product))

        .catch(error=>{
            console.log(error);
            res.status(500).send('ha habido un problema al tratar de actualizar el producto')
        })
    }
}
module.exports = ProductController;

