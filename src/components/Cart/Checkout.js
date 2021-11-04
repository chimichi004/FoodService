
import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const Checkout = (props) => {
    const [isFormValidity, setIsFormValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true
    });

    const name = useRef();
    const street = useRef();
    const postal = useRef();
    const city = useRef();

    const isEmpty = value => value.trim() === '';
    const isFiveChars = value => value.trim().length === 5;

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = name.current.value;
        const enteredStreet = street.current.value;
        const enteredPostal = postal.current.value;
        const enteredCity = city.current.value;

        const isNameValid = !isEmpty(enteredName);
        const isStreetValid = !isEmpty(enteredStreet);
        const isPostalValid = !isFiveChars(enteredPostal);
        const isCityValid = !isEmpty(enteredCity);

        setIsFormValidity({
            name: isNameValid,
            street: isStreetValid,
            postal: isPostalValid,
            city: isCityValid
        });


        const isFormValid = isNameValid && isStreetValid && isPostalValid && isCityValid;

        if(!isFormValid){
            return;
        }

        //Submit cart
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostal
        });
    };

    const nameValidity = `${classes.control} ${isFormValidity.name ? '' : classes.invalid}`;
    const streetValidity = `${classes.control} ${isFormValidity.street ? '' : classes.invalid}`;
    const postalValidity = `${classes.control} ${isFormValidity.postal ? '' : classes.invalid}`;
    const cityValidity = `${classes.control} ${isFormValidity.city ? '' : classes.invalid}`;

    return <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameValidity}>
            <label htmlFor="name">Your name</label>
            <input id="name" type="text" />
            {!isFormValidity.name && <p>Invalid Name</p>}
        </div>
        <div className={streetValidity}>
            <label htmlFor="street">Street</label>
            <input id="street" type="text" />
            {!isFormValidity.street && <p>Invalid Street</p>}
        </div>
        <div className={postalValidity}>
            <label htmlFor="postal">Postal Code</label>
            <input id="postal" type="text" />
            {!isFormValidity.postal && <p>Invalid Postal Code</p>}
        </div>
        <div className={cityValidity}>
            <label htmlFor="city">City</label>
            <input id="city" type="text" />
            {!isFormValidity.city && <p>Invalid City</p>}
        </div>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type="submit">Confirm</button>
    </form>
};


export default Checkout;
