import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/shared/Layout";
import ProductsPage from "./components/products/ProductsPage";
import Register from "./components/connect/Register";
import Login from "./components/connect/Login";
import SingleProduct from "./components/products/SingleProduct";
import Cart from "./components/cart/Cart"
import HomePage from "./components/HomePage/HomePage";






function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="Products" index element={<ProductsPage />} />
              <Route path="Products/:id" index element={<SingleProduct />} />
              <Route path="Cart" index element={<Cart />} />
              <Route path="Login" index element={<Login />} />
              <Route path="Register" index element={<Register />} />
            </Route>
          </Routes>
        </Router>
  );
}

export default App;
