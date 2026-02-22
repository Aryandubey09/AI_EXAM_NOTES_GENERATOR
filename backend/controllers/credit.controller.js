import Stripe from "stripe";
import UserModel from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CREDIT_MAP = {
     100: 50,
     200: 120,
     500: 300,
};
export const createCreditOrder = async (req, res) => {
     try {
          const userId = req.userId
          const { amount } = req.body;
          if (!CREDIT_MAP[amount]) {
               return res.status(400).json({ message: "Invalid amount" })
          }
          const session = await stripe.checkout.sessions.create({
               mode: "payment",
               payment_method_types: ["card"],
               success_url: `${process.env.CLIENT_URL}/payment-success`,
               cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
               line_items: [
                    {
                         price_data: {
                              currency: "inr",
                              product_data: {
                                   name: `${CREDIT_MAP[amount]} Credits for ExamNotes AI`,

                              },
                              unit_amount: amount * 100,
                         },
                         quantity: 1,

                    },

               ],
               metadata: {
                    userId,
                    credits: CREDIT_MAP[amount]
               },

          })
          res.status(200).json({ url: session.url })
     } catch (error) {
          console.log("createCreditOrder error:", error.message);
          res.status(500).json({ message: "Failed to create credit order" })
     }
}

export const stripeWebhook = async (req, res) => {
     const sig = req.headers['stripe-signature'];
     let event;

     console.log("Webhook received, signature present:", !!sig);

     try {
          event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
          console.log("Webhook event type:", event.type);
     } catch (err) {
          console.log("Webhook signature verification failed.", err.message);
          return res.status(400).send(`Webhook Error: ${err.message}`);
     }
     
     if (event.type === 'checkout.session.completed') {
          const session = event.data.object;
          const userId = session.metadata.userId;
          const creditsToAdd = Number(session.metadata.credits);

          console.log("Processing payment completion - UserId:", userId, "Credits:", creditsToAdd);

          if(!userId || !creditsToAdd){
               console.log("Invalid session metadata - userId:", userId, "credits:", creditsToAdd);
               return res.status(400).json({ message: "Invalid session metadata" })
          }
          try {
               const user = await UserModel.findByIdAndUpdate(userId,{
                    $inc:{credits:creditsToAdd},
                    $set: {isCreditAvailable:true},
               },
               {new:true})
               console.log("User credits updated:", user?.credits);
          } catch (dbError) {
               console.log("Database error updating credits:", dbError.message);
               return res.status(500).json({ message: "Failed to update credits" })
          }

     }
     res.json({ received: true });

}