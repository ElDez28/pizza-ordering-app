import Navbar from "./Navbar";
import Footer from "./Footer";
import Featured from "./Featured";
import PizzaList from "./PizzaList";
import OrderDetail from "./OrderDetail";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      {children}

      <Footer></Footer>
    </>
  );
};

export default Layout;
