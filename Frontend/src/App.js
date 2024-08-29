import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import DashBoard from "./pages/dashboard/Dashboard";
import Header from "./pages/header/Header";
import Bill from "./pages/dashboard/bills/bill";
import BillPage from "./pages/billPage/newBill/createBill"
import VacatePage from "./pages/vacate/vacate"

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Signup></Signup>}></Route>
        <Route path="/users/*" element={<DashBoard></DashBoard>}></Route>
        <Route path="/users/bills/:id" element={<Bill />} />
        <Route path="/bills/:id" element={<BillPage />}></Route>  
        <Route path="/users/vacate/:id" element={<VacatePage/>}></Route>
      </Routes>
    </>
  );
}


export default App;
