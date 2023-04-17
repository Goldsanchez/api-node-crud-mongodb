const express = require("express") // pass mongodb: JW7y60P4ZBO1IoGf
const mongoose = require("mongoose")
const Product = require("./models/productModel")
require("dotenv").config()


const app = express()
app.use(express.json())

const URL_CONNECT = process.env.URL_CONNECT
const PORT = process.env.PORT

app.listen(PORT, () => {

    console.log("server node");
})

app.get("/", (req, res) => {
    res.send("Hola B")
})

// Get Recuperar todos los producto

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Get Recuperar producto por ID

app.get("/product/:id", async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Post Agregar un producto
app.post("/product", async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Get Eliminar producto por ID

app.delete("/product/:id", async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product) return res.status(404).json({message: `Cannot find this ID ${id}`})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put("/product/:id", async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product) return res.status(404).json({message: `Cannot find this ID ${id}`})
        const productUpdated = await Product.findById(id)
        res.status(200).json(productUpdated)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.connect(URL_CONNECT)
    .then(()=>{
        console.log("Connect whit mongo");
    })
    .catch(error => {
        console.log(error);
    })