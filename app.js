const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

//route root directory
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

//route show restaurant
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find((restaurant) => 
    restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant: restaurant })
})

//route search
app.get('/search',(req,res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter((restaurant) => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { restaurants: restaurants,keyword:keyword })
})


app.listen(port, () => {
  console.log(`This web is listening on http://localhost:${port}`)
})