import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "./components/Payment.jsx";
import PaySuccess from "./components/PaySuccess.jsx";
import PayCancel from "./components/PayCancel.jsx";

function App() {
  return (
     <BrowserRouter>
      <Routes>
          <Route path="/" element={<Payment />} />
          <Route path="/payment-success" element={<PaySuccess />} />
          <Route path="/payment-cancelled" element={<PayCancel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
