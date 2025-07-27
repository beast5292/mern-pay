import React from 'react';

export default function Payment() {

  // Event handler functions for PayHere
  window.payhere.onCompleted = function (orderId) {
    console.log("Payment completed. OrderID: " + orderId);
  };

  window.payhere.onDismissed = function () {
    console.log("Payment dismissed");
  };

  window.payhere.onError = function (error) {
    console.log("Error: " + error);
  };

  const handlePayment = async () => {
    const paymentObject = {
      order_id: "order123",
      items: "Shoes",
      amount: "50.00",
      currency: "LKR",
      first_name: "Saman",
      last_name: "Perera",
      email: "samanp@gmail.com",
      phone: "0771234567",
      address: "No.1, Galle Road",
      city: "Colombo",
      country: "Sri Lanka"
    };

    // 👉 Toggle this to true or false to test with and without notify_url
    const includeNotifyURL = true;

    try {
      const response = await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentObject),
      });

      if (response.ok) {
        const { hash, merchant_id } = await response.json();

        const payment = {
          sandbox: true,
          merchant_id,
          return_url: "http://localhost:5173/payment-success",
          cancel_url: "http://localhost:5173/payment-cancelled",
          ...(includeNotifyURL && {
            notify_url: "https://localhost:5000/api/payment/notify", // ❌ will cause issues unless domain whitelisted
          }),
          ...paymentObject,
          hash,
        };

        console.log("Sending payment object:", payment);
        window.payhere.startPayment(payment);
      } else {
        console.log("Failed to generate hash for payment");
      }
    } catch (e) {
      console.log("Error occurred: ", e);
    }
  };

  // ✅ This is the actual component return
  return (
    <div className="form">
      <h2>PayHere Checkout</h2>
      <button onClick={handlePayment}>Checkout</button>
    </div>
  );
}
