import handlePurchaseWithFee from "../../../models/Payments";
import { PublicKey } from "@solana/web3.js";

export default async function handler(req, res) {
    const { method } = req;

    try {
        if (method === "POST") {
            const { amount, sellerPublicKey, productId, userPublicKey } = req.body;

            // Walidacja danych wejściowych
            if (!amount || typeof amount !== "number" || amount <= 0) {
                return res.status(400).json({ error: "Invalid amount. Amount must be a positive number." });
            }

            if (!sellerPublicKey || !PublicKey.isOnCurve(sellerPublicKey)) {
                return res.status(400).json({ error: "Invalid seller public key. Please provide a valid Solana public key." });
            }

            if (!productId || !userPublicKey) {
                return res.status(400).json({ error: "Missing required fields: productId or userPublicKey." });
            }

            try {
                const signature = await handlePurchaseWithFee(amount, sellerPublicKey, productId, userPublicKey);
                return res.status(200).json({ message: "Transaction successful", signature });
            } catch (err) {
                if (err.message === "Transaction was rejected by Phantom Wallet.") {
                    return res.status(400).json({ error: err.message });
                }
                throw err;
            }
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Error in payments route:", error);
        return res.status(500).json({ error: error.message });
    }
}
