const app =require('express')
const router = app.Router()
const { getAllCategories ,getCategorybyId,getCategorybyName,createCategory,deleteCategory,updateCategory}=require('./Controller')

router.get('/get-all-categories',getAllCategories)
router.get('/get-category-by-id',getCategorybyId)
router.get('/get-category-by-name',getCategorybyName)
router.post('/create-categories',createCategory)
router.put('/update-categories',updateCategory)
router.delete('/delete-categories',deleteCategory)


module.exports = router