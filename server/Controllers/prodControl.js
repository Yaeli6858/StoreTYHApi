const Products = require("../models/Products");

//צפיה
const getAllProducts = async (req, res) => {
    const page = req.query.page || 1
    const limit = 8
    const category = req.query.category || '';

    const filter = category ? { category } : {};
    const skip = (page -1)*limit
    const total = await Products.countDocuments(filter);

    const prod = await Products.find(filter).skip(skip).limit(limit)
    if (!prod) {
        return res.status(400).json({ message: 'No prod found' })
    }
    res.json({
        products: prod,
        total: total
})
}

//צפיה בדף אחד
const getProdById = async (req, res) => {
    const { id } = req.params
    const prod = await Products.findById(id)

    if (!prod) {
        return res.status(400).json({ message: 'No prod found' })
    }
    res.json(prod)
}

//מחיקת מוצר
const deleteProduct = async (req, res) => {
    const { id } = req.body
    const prod = await Products.findById(id).exec()
    console.log(prod, "found");
    if (!prod) {
        return res.status(400).json({ message: 'prod not found' })
    }
    await prod.deleteOne()
    console.log("deleted");

    res.json(`prod '${prod.name}' ID ${prod._id} deleted`)
}


//הוספת מוצר
const addProduct = async (req, res) => {
    const { name, description, price, category } = req.body
    if (!name || !price) {
        return res.status(400).json({ message: 'required' })
    }
    const prod = await Products.create({ name: name, description: description, price: price, category: category });
    res.json(prod)
}

//עדכון מוצר
const updateProduct = async (req, res) => {
    const { id, name, description, price, category } = req.body
    if (!id) {
        return res.status(400).json({ message: 'required' })
    }
    const product = await Products.findById(id).exec()
    if (!product) {
        return res.status(400).json({ message: 'not found' })
    }
    product.name = name
    product.description = description
    product.price = price
    product.category = category
    const prod = await product.save()
    res.json(`${prod} updated!`)
}

module.exports = {
    getAllProducts,
    getProdById,
    deleteProduct,
    addProduct,
    updateProduct
}