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

  const handlePayment = () => {
    // Fetching the hashed and other data related to the payment, from the backend
    fetch('/api/payment')
      .then(response => response.json())
      .then(result => {
        // Filling the PayHere payment object with the data recieved from the backend
        const paymentObject = {
          "sandbox": true,                 // true if using Sandbox Merchant ID
          "merchant_id": result.merchant_id,        // Replace your Merchant ID
          "return_url": "http://localhost:3000/success",
          "cancel_url": "http://localhost:3000/cancel",
          "notify_url": "http://localhost:5000/api/payment/notify",
          "order_id": result.order_id,
          "items": "Testing Item",
          "amount": "50.00",
          "currency": "LKR",
          "hash": result.hash,
          "first_name": "Saman",
          "last_name": "Perera",
          "email": "samanp@gmail.com",
          "phone": "0771234567",
          "address": "No.1, Galle Road",
          "city": "Colombo",
          "country": "Sri Lanka",
          "delivery_address": "No. 46, Galle road, Kalutara South",
          "delivery_city": "Kalutara",
          "delivery_country": "Sri Lanka",
          "custom_1": "",
          "custom_2": ""
        };

        // Launching the PayHere GUI
        payhere.startPayment(paymentObject);

      });
  };

  return (
    <div className='form'>
      <button onClick={handlePayment}>Checkout</button>
    </div>
  )
}

export default App;
