const app =require('express')
const router = app.Router()
const { getAllCategories ,getCategorybyId,getCategorybyName,createCategory,deleteCategory,updateCategory}=require('./controller')

router.get('/get-all-categories',getAllCategories)
router.get('/get-category-by-id',getCategorybyId)
router.get('/get-category-by-name',getCategorybyName)
router.post('/create-categories',createCategory)
router.put('/update-category',updateCategory)
router.delete('/delete-category',deleteCategory)


module.exports = router