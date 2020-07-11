import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import AxiosOrders from '../../../axios-orders';
import { useHistory } from 'react-router-dom';
import { Ingredients } from '../../BurgerBuilder/BurgerBuilder';
import Spinner from '../../../components/UI/Spinner/Spinner';

interface Props {
    ingredients: Ingredients;
    price: number;
}

interface Address {
    street: string,
    zipCode: string,
}

const ContactData = (props: Props) => {
    const [email, emailUpdate] = useState('test@test.com');
    const [name, nameUpdate] = useState('Mateusz Kisiel');
    const [address, addressUpdate] = useState({
        street: '',
        zipCode: ''
    } as Address);
    const [loading, loadingUpdate] = useState(false);

    const history = useHistory();

    const orderSubmitHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        console.log(props.ingredients);
        const order = {
            customer: {
                name: name,
                address: {
                    ...address
                },
                email: email
            },
            price: props.price,
            ingredients: props.ingredients,
            deliveryMethod: 'fastest'
        }
        loadingUpdate(true);
        AxiosOrders.post('/oders.json', order)
            .then(response => {
                console.log(response);
                loadingUpdate(false);
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
                loadingUpdate(false);
            });
    }

    let form = (
        <form>
            <input className={classes.Input} type='text' name='name' placeholder='Your Name' />
            <input className={classes.Input} type='email' name='email' placeholder='Your Mail' />
            <input className={classes.Input} type='text' name='street' placeholder='Street' />
            <input className={classes.Input} type='text' name='postal' placeholder='Postal Code' />
            <Button btnType='Success' clicked={orderSubmitHandler}>ORDER</Button>
        </form>
    );
    if (loading)
        form = <Spinner />


    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

export default ContactData;