const express = require('express')
const router = express.Router()
const {auth, adminOnly} = require('../middleware/auth')
const {creatProducts,getProducts,getProductById,updateProduct,deleteProduct} = require('../controlllers/productController')


router.post('/creatProducts',auth ,adminOnly,creatProducts)
router.get('/getProducts',getProducts)
router.get('/getProductById/:id',getProductById)
router.put("/updateProduct/:id", auth,adminOnly, updateProduct);
router.delete("/deleteProduct/:id", auth,adminOnly, deleteProduct);


module.exports = router