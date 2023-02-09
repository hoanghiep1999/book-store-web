import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loading';
import { baseUrl } from '../../commons/constants';

import './OrderPage.css';

import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function OrderPage ({children}) {
  const {id} = useParams();
  const [orderData, setOrderData] = useState();
  const user = useSelector(state => state.user)

  useEffect(() => {
    axios.get(`${baseUrl}/api/order/${id}`)
      .then(res => setTimeout(() => setOrderData(res.data), 2500))
      .catch(err => {
        throw err;
      })
  }, [id]);

  return (
    <>
      <Header />
      <div className="order-page">
        <div className="order-page-container">
          <div className="order-page-back">
            <Link to="/"><i className="fa-solid fa-left-long"></i>Back to homepage</Link>
          </div>
          {
            orderData ? <>
              <h3>Order Received</h3>
              <h4>Thank you. Your order has been received.</h4>
              <div className="order-info">
                <div className="order-info-group">
                  <span>Order ID</span>
                  <span>{orderData._id}</span>
                </div>
                <div className="order-info-group">
                  <span>Date</span>
                  <span>{orderData.createAt.slice(0,10).split('-').reverse().join('/') + "  "} 
                    {Number(orderData.createAt.slice(11,19).split(':')[0]) + 7 + ":" + orderData.createAt.slice(11,19).split(':')[1] + ":" + orderData.createAt.slice(11,19).split(':')[2]}
                  </span>
                </div>
                <div className="order-info-group">
                  <span>Total</span>
                  <span>{`$${orderData.total.$numberDecimal}`}</span>
                </div>
                <div className="order-info-group">
                  <span>Payment method</span>
                  <span>{orderData.paymentMethod}</span>
                </div>
              </div>
              <div className="order-details">
                <span>Order details</span>
                <ul>
                  <li>
                    <span>Total Item</span>
                    <span>:</span>
                    <span>{orderData.products.length} items</span>
                  </li>
                  <li>
                    <span>Name</span>
                    <span>:</span>
                    <span>{orderData.contactInfo.name}</span>
                  </li>
                  <li>
                    <span>Email</span>
                    <span>:</span>
                    <span>{user.userEmail}</span>
                  </li>
                  <li>
                    <span>Address</span>
                    <span>:</span>
                    <span>{orderData.contactInfo.address}, {orderData.contactInfo.country}</span>
                  </li>
                  <li>
                    <span>Phone</span>
                    <span>:</span>
                    <span>{orderData.contactInfo.phone}</span>
                  </li>
                </ul>
              </div>
              <div className="order-total">
                <span>Total</span>
                <span>{`$${orderData.total.$numberDecimal}`}</span>
              </div></> :
              <Loading />
          }
        </div>
      </div>
      {children}
      <Footer />
    </>
  );
}