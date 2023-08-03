const app =require('express')
const router = app.Router()
const { createProduct,getAllProduct,getProductbyCategory,deleteProduct,updateProduct}=require('./controller')

router.get('/get-all-product',getAllProduct)
router.get('/get-product-by-category',getProductbyCategory)
// router.get('/get-product-by-brand',getProductbyBrand)
router.post('/create-product',createProduct)
router.put('/update-product',updateProduct)
router.delete('/delete-product',deleteProduct)




module.exports = router