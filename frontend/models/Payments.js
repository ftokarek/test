import { 
        Connection, 
        PublicKey, 
        Transaction, 
        SystemProgram,
        clusterApiUrl,
        sendAndConfirmTransaction
    } from '@solana/web3.js';
import { stringify } from 'postcss';
import { inngest } from '@/config/inngest';


    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Funkcja do pobrania danych sprzedawcy z backendu
    const getSellerPublicKey = async (seller_id) => {
        try {
            console.log("seller_id", seller_id);
            const response = await fetch(`http://localhost:8000/sellers/${seller_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) 
            {
                throw new Error(`Failed to fetch seller data: ${response.status}`);
            }

            const seller = await response.json();
            return seller; // Zwraca klucz publiczny sprzedawcy
        } 
        catch (err) 
        {
            console.error("Error fetching seller data:", err);
            throw new Error("Unable to fetch seller data.");
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
            // // Check if Phantom Wallet is installed
            // if (!window.solana || !window.solana.isPhantom) 
            // {
            //     alert("Please install Phantom Wallet!");
            //     return; 
            // }
            
            // // Connect to Phantom Wallet if not already connected
            // if (!window.solana.isConnected) 
            // {
            //     console.log("NOT Connected to Phantom Wallet");
            //     await window.solana.connect();
            //     console.log("Connected to Phantom Wallet");
            // }
            // console.log("seller_id", seller_id)

            // // Pobierz klucz publiczny sprzedawcy z backendu
            // const sellerPublicKeyString = await getSellerPublicKey(seller_id);
            // console.log("sellerPublicKeyString", sellerPublicKeyString)
            // const sellerPublicKey = validatePublicKey(sellerPublicKeyString);
            // const neuroSpherePublicKey = validatePublicKey("3cL1Y7NZm4JtAYMGwtMJGLYYsyhxRruxBejHLKLRP1e5"); //process.env.NEXT_PUBLIC_NEUROSPHERE_PUBLIC_KEY

            // // Pobierz produkty użytkownika z backendu
            // // const userProducts = await getUserProducts(user_id);
            // // console.log("User products:", userProducts);

            // // Sprawdź, czy użytkownik już kupił ten produkt
            // // if (userProducts.some(product => product.id === product_id)) 
            // // {
            // //     alert("You have already purchased this product.");
            // //     return;
            // // }

            // const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
            
            // const totalLamports = amount * 1_000_000_000;
            
            // const feeLamports = Math.floor(totalLamports * 0.1); // 10% for NeuroSphere
            // const sellerLamports = totalLamports - feeLamports; // 90% for the seller
            
            // const transaction = new Transaction();
            
            // transaction.add(
            //     SystemProgram.transfer({
            //         fromPubkey: window.solana.publicKey,
            //         toPubkey: sellerPublicKey,
            //         lamports: sellerLamports,
            //     })
            // );
            
            // transaction.add(
            //     SystemProgram.transfer({
            //         fromPubkey: window.solana.publicKey,
            //         toPubkey: neuroSpherePublicKey,
            //         lamports: feeLamports,
            //     })
            // );
            
            // transaction.feePayer = window.solana.publicKey;
            
            // const blockhash = await connection.getLatestBlockhash();
            // transaction.recentBlockhash = blockhash.blockhash;
            
            // // Ask the user to sign the transaction
            // const signedTransaction = await window.solana.signTransaction(transaction);
            
            // // Send the signed transaction to SOL
            // const signature = await connection.sendRawTransaction(signedTransaction.serialize());
            
            // console.log('Transaction sent:', signature);
            
            // // Confirm the transaction
            // const confirmation = await connection.confirmTransaction(signature, 'confirmed');
            
            // if (confirmation.value.err) 
            // {
            //     alert('Transaction confirmation failed');
            //     return;
            // }
            
            // console.log('Transaction confirmed:', signature);
            // console.log(`Sent ${sellerLamports/1_000_000_000} SOL to seller and ${feeLamports/1_000_000_000} SOL to NeuroSphere`);
            // alert(`Payment successfully completed! Transaction ID: ${signature}`);
            
            // Send transaction details to backend
// Send transaction details to Inngest

            try {
                // Send transaction details to Inngest
                await inngest.send({
                    name: "user/prompt.purchased", // Nazwa zdarzenia
                    data: {
                        user_id: user_id,
                        prompt: {
                            id: product_id, // Zakładam, że `product_id` to ID promptu
                            title: product_name, // Możesz pobrać tytuł promptu z innego miejsca
                        },
                    },
                });

                console.log("Event successfully sent to Inngest");
            } catch (inngestErr) {
                console.error("Error sending event to Inngest:", inngestErr);
                alert(`An error occurred while sending data to Inngest: ${inngestErr.message}`);
            }


    //     
        } catch (err) {
            console.error('Error during purchase with fee:', err);
            alert(`An error occurred: ${err.message}`);
        }
    }

    export default handlePurchaseWithFee;
