import Payment from "../models/payment.model.js";
import stripe from "../services/stripeservice.js";
import User from "../models/user.model.js";

export const createOrder = async (req, res) => {
  try {
    const { planId, amount, credits } = req.body;

    if (!amount || !credits) {
      return res.status(400).json({ message: "Invalid plan data" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Plan ${planId}`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url:
  "https://interviewiq-2-vanshu.onrender.com/pricing?success=true&session_id={CHECKOUT_SESSION_ID}",
cancel_url:
  "https://interviewiq-2-vanshu.onrender.com/pricing?canceled=true",
      metadata: {
        userId: req.userId,
        credits: credits,
      },
    });

    return res.json({ url: session.url });

  } catch (error) {
    console.log("CREATE ERROR 👉", error);
    return res.status(500).json({ message: "Payment failed" });
  }
};

export const verifySession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    if (session.metadata.processed === "true") {
      return res.json({ message: "Already processed" });
    }

    const userId = session.metadata.userId;
    const credits = Number(session.metadata.credits);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { credits: credits } },
      { returnDocument: "after" }
    );

    await stripe.checkout.sessions.update(sessionId, {
      metadata: {
        ...session.metadata,
        processed: "true",
      },
    });

    return res.json({ success: true, user: updatedUser });

  } catch (error) {
    console.log("VERIFY ERROR 👉", error);
    return res.status(500).json({ message: "Verification failed" });
  }
};
