import handleAsyncError from "../middleware/handleAsyncError.js";
import { instance } from "../server.js";

export const processPayment = handleAsyncError(async (req, res) => {
    console.log(req.body.amount)
    const options = {
        amount: Number(req.body.amount * 100),
        currency: 'INR'
    }
    const order = await instance.orders.create(options)
    res.status(200).json({
        success: true,
        order
    })
})

//send API key
export const sendAPIKey = handleAsyncError(async (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY
    })
})
