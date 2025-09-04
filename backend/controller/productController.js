import Product from "../models/productModel.js"
import HandleError from "../utils/handleError.js";
//creating products
export const createProducts=async(req,res)=>{
    console.log(req.body);
    
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
}

//getting all the products
export const getAllProducts=async(req,res)=>{
    const products = await Product.find()
    res.status(200).json({
        success:true,
        products
    })
}

//update the product
export const updateProduct=async(req,res,next)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new HandleError("Product Not Found",404))
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        product
    })    
}

//delete product
export const deleteProduct=async(req,res,next)=>{
    const product = await Product.findByIdAndDelete(req.params.id)
    if(!product){
        return next(new HandleError("Product Not Found",404))
    }
    res.status(200).json({
        success:true,
        message:"Product Deleted successfully"
    })    
}

//Accessing single Product
export const getSingleProduct=async(req,res,next)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return next(new HandleError("Product Not Found",404))
    }
    
    res.status(200).json({
        success:true,
        product
    })  
}
