import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
        const existingCartId = state.items.findIndex(item => item.id === action.payload.id);
        const existingCartItem = state.items[existingCartId];
        let updatedItems;

        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.payload.amount,
            }
            updatedItems = [...state.items];
            updatedItems[existingCartId] = updatedItem;
        } else{
            updatedItems = state.items.concat(action.payload);
        }

      return {
        items: updatedItems,
        totalAmount: state.totalAmount + action.payload.price * action.payload.amount,
      };
    case 'REMOVE_ITEM':    
        const existingCartId_RI =  state.items.findIndex(item => item.id === action.id);
        const existingCartItem_RI = state.items[existingCartId_RI];
        const updatedTotalAmount = state.totalAmount - existingCartItem_RI.price;
        let updatedItems_RI;

        if(existingCartItem_RI.amount === 1){
            updatedItems_RI = state.items.filter(item => item.id !== action.id);
        } else {    
            const updatedItem = {...existingCartItem_RI, amount : existingCartItem_RI.amount - 1};
            updatedItems_RI = [...state.items];
            updatedItems_RI[existingCartItem_RI] = updatedItem;
        }
        return {
            items: updatedItems_RI,
            totalAmount: updatedTotalAmount,
        };
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCardHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      payload: item,
    });
  };

  const removeItemToCardHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCardHandler,
    removeItem: removeItemToCardHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
