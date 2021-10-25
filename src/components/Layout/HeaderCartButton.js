import React, { useContext, useEffect, useState } from 'react';

import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props =>{
    const [btnHighlighted, setBtnHighlighted] = useState(false);
    const cartContxt = useContext(CartContext);
    const { items} = cartContxt;

    const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ''}`;

    const numberCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    useEffect(() => {
        if(items.length === 0){
            return;
        }

       const timer = setBtnHighlighted(true);

        setTimeout(() => {
            setBtnHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
        
    }, [items]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}><CartIcon/></span>
        <span>Your cart</span>
        <span className={classes.badge}>{numberCartItems}</span> 
    </button>;
};

export default HeaderCartButton;