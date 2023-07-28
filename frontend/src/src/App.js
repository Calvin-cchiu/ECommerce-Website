import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import "./styles/Header.css";
import "./styles/Footer.css";

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {
  return (
    <BrowserRouter>
      <Header/>
        <main className='py-3'>
          <Container>
          <Routes>
            <Route path='/' element={<HomeScreen/>} exact/>
            <Route path="/login" element={<LoginScreen/>} exact/>
            <Route path="/register" element={<RegisterScreen/>} exact/>
            <Route path="/profile" element={<ProfileScreen/>} exact/>
            <Route path="/shipping" element={<ShippingScreen/>} exact/>
            <Route path="/payment" element={<PaymentScreen/>} exact/>
            <Route path="/placeorder" element={<PlaceOrderScreen/>} exact/>
            <Route path="/order/:id" element={<OrderDetailsScreen/>} exact/>
            <Route path="/product/:id" element={<ProductScreen/>} exact/>
            <Route path="/cart/:id?" element={<CartScreen/>} exact/>
            <Route path="/admin/userlist" element={<UserListScreen/>} exact/>
            <Route path="/admin/user/:id/edit" element={<UserEditScreen/>} exact/>
            <Route path="/admin/productlist" element={<ProductListScreen/>} exact/>
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>} exact/>
            <Route path="/admin/orderlist" element={<OrderListScreen/>} exact/>
          </Routes>
          </Container>
        </main>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
