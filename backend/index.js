import express from "express";
import crypto from "crypto";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Sandbox merchant credentials
const merchant_id = "1231334";
const merchant_secret = "MzQyMDc4NTYxMjE1NTM5NTUwOTU0OTU4MDgyMTkzMTU0NTU0MDk2";

// Decode the base64 merchant secret
const decodedSecret = Buffer.from(merchant_secret, "base64").toString("utf-8");

console.log("Backend loaded. Routes are being registered...");

app.post("/api/payment", (req, res) => {
    console.log("API /api/payment hit")
    const { order_id, amount, currency } = req.body;

    if (!order_id || !amount || !currency) {
        console.log("Missing required fields in request");
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate hash for the frontend
    // Generate the hash value
    const hash = crypto
        .createHash("md5")
        .update(
            merchant_id +
            order_id +
            amount +
            currency +
            crypto.createHash("md5").update(decodedSecret).digest("hex")
        )
        .digest("hex")
        .toUpperCase();

    console.log("Hash generated for order:", order_id);

    res.json({ hash, merchant_id });
});

app.post("/api/payment/notify", (req, res) => {
    const {
        merchant_id,
        order_id,
        payhere_amount,
        payhere_currency,
        status_code,
        md5sig
    } = req.body;

    // Create local md5sig to compare
    const local_md5sig = crypto
        .createHash("md5")
        .update(
            merchant_id +
            order_id +
            payhere_amount +
            payhere_currency +
            status_code +
            crypto.createHash("md5").update(decodedSecret).digest("hex")
        )
        .digest("hex")
        .toUpperCase();

    console.log("Payment notification for order:", order_id);

    if (local_md5sig === md5sig && status_code == "2") {
        // Payment success - update the database
        console.log("Payment successful for order:", order_id);
        res.sendStatus(200);
    } else {
        // Payment verification failed
        console.log("Payment verification failed for order:", order_id);
        res.sendStatus(400);
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
