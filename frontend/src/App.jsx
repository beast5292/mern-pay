import { useState } from 'react'

function App() {
  // Event handler functions
  // Payment completed. It can be a successful failure.
  payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    // Note: validate the payment and show success or failure page to the customer
  };

  // Payment window closed
  payhere.onDismissed = function onDismissed() {
    // Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
  };

  // Error occurred
  payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:" + error);
  };

  const handlePayment = async () => {
    const paymentObject = {
      "order_id": "order123",
      "items": "Shoes",
      "amount": "50.00",
      "currency": "LKR",
      "first_name": "Saman",
      "last_name": "Perera",
      "email": "samanp@gmail.com",
      "phone": "0771234567",
      "address": "No.1, Galle Road",
      "city": "Colombo",
      "country": "Sri Lanka"
    };

    try {
      // Request backend to generate the hash value
      const response = await fetch(
        "http://localhost:5000/api/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentObject),
        }
      );

      if (response.ok) {
        const { hash, merchant_id } = await response.json();

        // Payment configuration
        const payment = {
          "merchant_id": merchant_id,        // Replace your Merchant ID
          "return_url": undefined,
          "cancel_url": undefined,
          "notify_url": "http://localhost:5000/api/payment/notify",
          "order_id": "order123",
          "items": "Shoes",
          "amount": "50.00",
          "currency": "LKR",
          "first_name": "Saman",
          "last_name": "Perera",
          "email": "samanp@gmail.com",
          "phone": "0771234567",
          "address": "No.1, Galle Road",
          "city": "Colombo",
          "country": "Sri Lanka",
          hash: hash
        };

        // Initialize PayHere payment
        payhere.startPayment(payment);
      } else {
        console.log("Failed to generate has for payment");
      }
    } catch (e) {
      console.log("Error occured: ", e);
    }
  };

  return (
    <div className='form'>
      <button onClick={handlePayment}>Checkout</button>
    </div>
  )
}

export default App;
