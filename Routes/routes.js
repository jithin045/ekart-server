const express = require('express')
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const wishController = require('../Controllers/wishController')
const cartController = require('../Controllers/cartController')


const jwtMiddle = require('../Middlewares/jwtMiddleware')

const router = new express.Router()

//to get all products
router.get('/all-products', productController.allProducts)

//to get one product
router.get('/get-product/:id', productController.getProduct)

//user registration
router.post('/register', userController.userRegister)

//user login
router.post('/login', userController.userLogin)

//add to wishlist
router.post('/addwish', jwtMiddle, wishController.addToWishlist)

//get wishlist items
router.get('/getwish', jwtMiddle, wishController.getWishlist)

//remove wishlist items
router.delete('/remwish/:id', jwtMiddle, wishController.removeWishlistItem)

//add to cart
router.post('/addcart', jwtMiddle, cartController.addToCart)

//get cart items
router.get('/getcart', jwtMiddle, cartController.getCart)

//remove cart items
router.delete('/remcart/:id', jwtMiddle, cartController.removeCart)

//increase cart items qty
router.get('/inccart/:id', jwtMiddle, cartController.increaseQuantity)

//decrease cart items qty
router.get('/deccart/:id', jwtMiddle, cartController.decreaseQuantity)

//to make cart items qty zero or empty
router.delete('/emptycart', jwtMiddle, cartController.emptyCart)


module.exports = router