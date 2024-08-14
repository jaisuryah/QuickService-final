import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import How from "../How/How";
import WelcomePage from "../Welcome/Welcome";
import CustHomePage from "../CustHomePage/CustHomePage";
import ServicesPage from "../Services/Services";
import AboutUs from "../About/About";
import ContactForm from "../Contact/Contact";
import AdminDashboard from "../AdminDashBoard/Admin";
import AddServices from "../AdminServices/AdminServices";
import ManageCustomers from "../AdminCus/AdminCus";
import ManageFeedbacks from "../AdminFeed/AdminFeed";
import ManageMechanics from "../AdminMech/AdminMech";
import ManageBookings from "../AdminBook/AdminBook";
import BookingDetails from "../Booking/Booking";
import ManageJobs from "../MechanicManageJob/MechJobs";
import Calendar from "../MechCalender/MechCal";




const Router = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/How" element={<How/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Welcome" element={<WelcomePage/>}/>
      <Route path="/CustHome" element={<CustHomePage/>}/>
      <Route path="/Services" element={<ServicesPage/>}/>
      <Route path="/Bookings" element={<BookingDetails/>}/>
      <Route path="/About" element={<AboutUs/>}/>
      <Route path="/Contact" element={<ContactForm/>}/>
      <Route path="/Admin" element={<AdminDashboard/>}/>
      <Route path="/AdminSer" element={<AddServices/>}/>
      <Route path="/AdminCus" element={<ManageCustomers/>}/>
      <Route path="/AdminFeed" element={<ManageFeedbacks/>}/>
      <Route path="/AdminMech" element={<ManageMechanics/>}/>
      <Route path="/AdminBook" element={<ManageBookings/>}/>
      <Route path="/Mechmanage" element={<ManageJobs/>}/>
      <Route path="/AdminMech" element={<ManageMechanics/>}/>

      </Routes>
      </BrowserRouter>
    </div>

  )
}

export default Router
