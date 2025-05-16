import { 
        Connection, 
        PublicKey, 
        Transaction, 
        SystemProgram,
        clusterApiUrl,
        sendAndConfirmTransaction
    } from '@solana/web3.js';
import { stringify } from 'postcss';


    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Funkcja do pobrania danych sprzedawcy z backendu
    const getSellerPublicKey = async (product_id) => {
        try {
            const response = await fetch("/api/product/get-pubkey", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ product_id }),
            });

            if (!response.ok) {
            throw new Error(`Failed to fetch publicKey: ${response.status}`);
            }

            const data = await response.json();

            if (!data.publicKey) {
            throw new Error("No publicKey returned in response");
            }

            return data.publicKey;
        } catch (err) {
            console.error("Error fetching publicKey:", err);
            throw new Error("Unable to fetch product's public key.");
        }
        
    };


    // Funkcja do pobrania produktów użytkownika z backendu
    const getUserProducts = async (user_id) => {
        try {
            const response = await fetch(`${BACKEND_URL}/users/${user_id}/products`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) 
            {
                throw new Error(`Failed to fetch user products: ${response.status}`);
            }

            const products = await response.json();
            return products; // Zwraca tablicę produktów użytkownika
        } 
        catch (err) 
        {
            console.error("Error fetching user products:", err);
            throw new Error("Unable to fetch user products.");
        }
    };

const validatePublicKey = (keyString) => {
  try {
    const publicKey = new PublicKey(keyString);
    console.log("Valid public key:", publicKey.toString());
    return publicKey;
  } catch (err) {
    console.error("Invalid public key:", err.message);
    throw new Error("Invalid public key format");
  }
};

    export const handlePurchaseWithFee = async (amount, seller_id, user_id, product_id, product_name) => {
        try {
            // Check if Phantom Wallet is installed
            if (!window.solana || !window.solana.isPhantom) 
            {
                alert("Please install Phantom Wallet!");
                return; 
            }
            
            // Connect to Phantom Wallet if not already connected
            if (!window.solana.isConnected) 
            {
                console.log("NOT Connected to Phantom Wallet");
                await window.solana.connect();
                console.log("Connected to Phantom Wallet");
            }
            console.log("seller_id", seller_id)

            // Pobierz klucz publiczny sprzedawcy z backendu
            const sellerPublicKeyString = await getSellerPublicKey(product_id);
            console.log("sellerPublicKeyString", sellerPublicKeyString)
            const sellerPublicKey = validatePublicKey(sellerPublicKeyString);
            const neuroSpherePublicKey = validatePublicKey("3cL1Y7NZm4JtAYMGwtMJGLYYsyhxRruxBejHLKLRP1e5"); //process.env.NEXT_PUBLIC_NEUROSPHERE_PUBLIC_KEY

            // Pobierz produkty użytkownika z backendu
            // const userProducts = await getUserProducts(user_id);
            // console.log("User products:", userProducts);

            // Sprawdź, czy użytkownik już kupił ten produkt
            // if (userProducts.some(product => product.id === product_id)) 
            // {
            //     alert("You have already purchased this product.");
            //     return;
            // }

            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
            
            const totalLamports = amount * 1_000_000_000;
            
            const feeLamports = Math.floor(totalLamports * 0.1); // 10% for NeuroSphere
            const sellerLamports = totalLamports - feeLamports; // 90% for the seller
            
            const transaction = new Transaction();
            
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: window.solana.publicKey,
                    toPubkey: sellerPublicKey,
                    lamports: sellerLamports,
                })
            );
            
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: window.solana.publicKey,
                    toPubkey: neuroSpherePublicKey,
                    lamports: feeLamports,
                })
            );
            
            transaction.feePayer = window.solana.publicKey;
            
            const blockhash = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash.blockhash;
            
            // Ask the user to sign the transaction
            const signedTransaction = await window.solana.signTransaction(transaction);
            
            // Send the signed transaction to SOL
            const signature = await connection.sendRawTransaction(signedTransaction.serialize());
            
            console.log('Transaction sent:', signature);
            
            // Confirm the transaction
            const confirmation = await connection.confirmTransaction(signature, 'confirmed');
            
            if (confirmation.value.err) 
            {
                alert('Transaction confirmation failed');
                return;
            }
            
            console.log('Transaction confirmed:', signature);
            console.log(`Sent ${sellerLamports/1_000_000_000} SOL to seller and ${feeLamports/1_000_000_000} SOL to NeuroSphere`);
            alert(`Payment successfully completed! Transaction ID: ${signature}`);
            
            // Send transaction details to backend
// Send transaction details to Inngest

            const res = await fetch("/api/user/add-product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: user_id,
                product_id: product_id,
                product_name: product_name,
            }),
            });

            if (!res.ok) {
                const { error } = await res.json();
                alert(`❌ Error: ${error}`);
            } else {
                console.log("✅ Product sent to backend");
            }


    //     
        } catch (err) {
            console.error('Error during purchase with fee:', err);
            alert(`An error occurred: ${err.message}`);
        }
    }

    export default handlePurchaseWithFee;
