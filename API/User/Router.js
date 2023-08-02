const app = require('express')
const router = app.Router()
const { Signup, LoginUser, getAllUser, getUserbyId, getUserbyEmail, updateUser, deleteUser } = require('./Controller')

router.get('/get-all-user', getAllUser)
router.get('/get-user-by-id', getUserbyId)
router.get('/get-user-by-email', getUserbyEmail)
router.post('/signup', Signup)
router.post('/login', LoginUser)
router.put('/update-user', updateUser)
router.delete('/delete-user', deleteUser)

module.exports = router            