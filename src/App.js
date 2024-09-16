import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
// import Result from './Result';
import Home from "./components/home";
import Orders from "./components/orders";
import Billing from "./components/billing";
import { SeeMore } from "./components/SeeMore";
import Finishedorders from "./components/Finishedorders";
import PendingBills from "./components/pendingBills";
import CompletedBills from "./components/completedBill";


function App() {
  return (
    <>
      <BrowserRouter basename="insightify-webapplication">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="orders" element={<Orders />}></Route>
          <Route path="billing" element={<Billing />}></Route>
          <Route path="pendingorders" element={<SeeMore />}></Route>
          <Route path="finishedorders" element={<Finishedorders/>}></Route>
          <Route path="pendingbills" element={<PendingBills/>}></Route>
          <Route path="completedbills" element={<CompletedBills/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
