const express = require('express')
const app = express()
require('dotenv').config()
const CategoryRouter= require('./API/Category/Router')
const ProductRouter= require('./API/Product/Router')
const BrandRouter= require('./API/Brand/Router')
const UserRouter= require('./API/User/Router')
const port = process.env.SERVER_PORT || 3200

app.use(express.json())
app.use('/api',CategoryRouter)
app.use('/api',UserRouter)
app.use('/api',ProductRouter)
app.use('/api',BrandRouter)


ProductRouter
// app.get('/', (req, res) => {
//   res.send('Hello World!',CategoryRouter)
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})