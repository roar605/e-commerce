import Product from "../models/productModel.js"
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";

//creating products
export const createProducts = handleAsyncError(async (req, res, next) => {
    req.body.user=req.user.id;
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})

//getting all the products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
    const resultPerPage = 3;
    const apiFeatures = new APIFunctionality(Product.find(), req.query).search().filter()
    //calculation before applying pagination
    const filteredQuery = apiFeatures.query.clone();
    const productCount = await filteredQuery.countDocuments();

    //calculating total pages based on filtered count
    const totalPages = Math.ceil((productCount / resultPerPage));
    const page = Number(req.query.page) || 1
    if (page > totalPages && productCount > 0) {
        return next(new HandleError("This page does noot exist", 404))
    }
    //apply pagination
    apiFeatures.pagination(resultPerPage);
    const products = await apiFeatures.query

    if (!products || products.length === 0) {
        return next(new HandleError("No product found"), 404)
    }

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        totalPages,
    })
})

//update the product
export const updateProduct = handleAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new HandleError("Product Not Found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })
})

//delete product
export const deleteProduct = handleAsyncError(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
        return next(new HandleError("Product Not Found", 404))
    }
    res.status(200).json({
        success: true,
        message: "Product Deleted successfully"
    })
})

//Accessing single Product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new HandleError("Product Not Found", 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})
