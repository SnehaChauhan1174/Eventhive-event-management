const {createRazorpayInstance} = require('../config/razorpay')
const crypto=require('crypto');
require('dotenv').config();
const Event=require('../models/eventListing');

const razInstance = createRazorpayInstance();

exports.createOrder = async(req,res)=>{
    //metadata from frontend
    //do not accept amount from client
    const {eventId} = req.body;
    //event id se fetch krna h for actual price
    const event=await Event.findById(eventId);
    const amount=event.price;
    //craete an order
    const options = {
        amount:amount * 100, 
        currency:"INR",
        receipt:`receipt_${eventId}`
    }
    try{
        razInstance.orders.create(options,(err,order)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    message:'something went wrong'
                })
            }
            return res.status(200).json(order);
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'something went wrong'
        })
    }
}

module.exports.verifyPayment = (req,res)=>{
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const hmac=crypto.createHmac("sha256",secret);
    hmac.update(razorpay_order_id+"|"+razorpay_payment_id);
    const generateSign=hmac.digest('hex');

    if(generateSign===razorpay_signature){
        return res.status(200).json({
            success:true,
            message:"Payment verified"
        })
    }
    else{
        return res.status(400).json({
            success:false,
            message:"payment not verified"
        })
    }

}
