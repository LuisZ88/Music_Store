import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/auth-context";
import CartContext from "./cart-context";
import {useNavigate} from 'react-router'

export default function PaypalButton() {
let navigate = useNavigate()
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const invoice = {
    totalAmount: cartCtx.totalAmount,
    items: cartCtx.items,
    id: '',
    date: '',

  };
  const updateInvoice = async () => {
    await axios.put(`${process.env.REACT_APP_BACKEND}api/auth/updateInvoice`, invoice, {
      headers: {
        Authorization: authCtx.token,
      },
    });
  };
 

  return (
    <PayPalScriptProvider options={{ "client-id": "test" }}>
      <PayPalButtons
      
        style={{
          layout: "horizontal",
          color: "blue",
          shape: "rect",
          label: "paypal",
          tagline: false,
          height: 25,
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: cartCtx.totalAmount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {

            //   console.log(details)
              invoice.date = details.update_time;
              invoice.id = details.id;
              updateInvoice();
              navigate('/user');
              cartCtx.emptyCart();
              
              
            
          });
        }}
      />
    </PayPalScriptProvider>
  );
}
