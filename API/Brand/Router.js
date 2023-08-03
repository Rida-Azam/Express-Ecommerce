const app = require('express')
const router = app.Router()
const { createBrand, getAllBrand, getBrandbyId, getBrandbyName,deleteBrand,updateBrand } = require('./controller')

router.get('/get-all-brand', getAllBrand)
router.get('/get-brand-by-id', getBrandbyId)
router.get('/get-brand-by-name', getBrandbyName)
router.post('/create-brand', createBrand)
router.put('/update-brand',updateBrand)
router.delete('/delete-brand',deleteBrand)


module.exports = router