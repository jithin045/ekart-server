const carts = require('../Models/cartModel')

//add items to cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.payload
        const { id, title, price, image, quantity } = req.body

        const existingProduct = await carts.findOne({ userId, id })
        if (existingProduct) {
            existingProduct.quantity += 1
            existingProduct.totalPrice = existingProduct.price * existingProduct.quantity
            await existingProduct.save()
            res.status(200).json("Product Added Again")
        }
        else {
            const newCart = new carts({
                id, title, price, image, quantity: 1, totalPrice: price, userId
            })
            await newCart.save()
            res.status(200).json("Product Added to cart!!")

        }
    }
    catch (err) {
        res.status(401).json(err)
    }
}

//get cart items
exports.getCart = async (req, res) => {
    try {
        const userId = req.payload
        const result = await carts.find({ userId })
        res.status(200).json(result)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

//remove item from cart
exports.removeCart = async (req, res) => {
    try {
        const cid = req.params.id
        const result = await carts.findByIdAndDelete({ _id: cid })
        res.status(200).json("Item Removed from Cart!!!")
    }
    catch (err) {
        res.status(401).json(err)
    }
}

//increase cart qty
exports.increaseQuantity = async (req, res) => {
    try {
        const cid = req.params.id
        const cartItem = await carts.findById({ _id: cid })
        cartItem.quantity += 1
        cartItem.totalPrice = cartItem.quantity * cartItem.price
        await cartItem.save()
        res.status(200).json("Quantity Updated !!")
    }
    catch (err) {
        res.status(401).json(err)
    }
}

//decrease cart qty
exports.decreaseQuantity = async (req, res) => {
    try {
        const cid = req.params.id
        const cartItem = await carts.findById({ _id: cid })
        if (cartItem == 1) {
            const result = await carts.findByIdAndDelete({ _id: cid })
            res.status(200).json("Item Removed from Cart!!!")
        }
        else {
            cartItem.quantity -= 1
            cartItem.totalPrice = cartItem.quantity * cartItem.price
            await cartItem.save()
            res.status(200).json("Quantity Updated !!")
        }
    }
    catch (err) {
        res.status(401).json(err)
    }

}

//remove all cart items
exports.emptyCart = async (req, res) => {
    try {
        const userId = req.payload

        const result = await carts.deleteMany({ userId })
        res.status(200).json("cart is Empty")
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}