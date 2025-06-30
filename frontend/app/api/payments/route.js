import handlePurchaseWithFee from "../../../models/Payments";
import { PublicKey } from "@solana/web3.js";

export async function POST(request) {
    try {
        const body = await request.json();
        const { amount, sellerPublicKey, productId, userPublicKey } = body;

        // Walidacja danych wejściowych
        if (!amount || typeof amount !== "number" || amount <= 0) {
            return Response.json({ error: "Invalid amount. Amount must be a positive number." }, { status: 400 });
        }

        if (!sellerPublicKey || !PublicKey.isOnCurve(sellerPublicKey)) {
            return Response.json({ error: "Invalid seller public key. Please provide a valid Solana public key." }, { status: 400 });
        }

        if (!productId || !userPublicKey) {
            return Response.json({ error: "Missing required fields: productId or userPublicKey." }, { status: 400 });
        }

        try {
            const signature = await handlePurchaseWithFee(amount, sellerPublicKey, productId, userPublicKey);
            return Response.json({ message: "Transaction successful", signature }, { status: 200 });
        } catch (err) {
            if (err.message === "Transaction was rejected by Phantom Wallet.") {
                return Response.json({ error: err.message }, { status: 400 });
            }
            throw err;
        }
    } catch (error) {
        console.error("Error in payments route:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}