import { useEffect, useReducer, useState } from "react";
import Cookies from 'universal-cookie'
import CartContext from "./cart-context";
const cookies = new Cookies()
const defaultCartState = {
  items: cookies.get('items') || [],
  totalAmount: cookies.get('totalAmount') || 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    let updatedItems = state.items.concat(action.item); //El método concat() se usa para unir dos o más arrays. Este método no cambia los arrays existentes, sino que devuelve un nuevo array.
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItem
    if(existingCartItem){
      updatedItem= {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
    return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
    };
  }
  if (action.type === "REMOVE_ITEM") {
   
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
    const existingItem =  state.items[existingCartItemIndex]
    const updatedTotalAmount = state.totalAmount - existingItem.price
    let updatedItems;
    if (existingItem.amount === 1){
      updatedItems = state.items.filter(item => item.id !== action.id)
    }else{
     const updatedItem = {...existingItem, amount: existingItem.amount - 1}
     updatedItems = [...state.items];
     updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return {defaultCartState};
};

const CartProvider = (props) => {
  
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  useEffect(()=>{
    cookies.set('items', cartState.items, {path:'/'})
    cookies.set('totalAmount', cartState.totalAmount, {path:'/'})
  },[cartState.items])
  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item: item,
    });
  };
  const removeItemToCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

  const cartCtx = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };
  return (
    <CartContext.Provider value={cartCtx}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
