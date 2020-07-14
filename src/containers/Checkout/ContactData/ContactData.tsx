import React, { useState} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import AxiosOrders from '../../../axios-orders';
import { useHistory } from 'react-router-dom';
import { Ingredients } from '../../BurgerBuilder/BurgerBuilder';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

interface Props {
    ingredients: Ingredients;
    price: number;
}

interface Address {
    street: string,
    zipCode: string,
}


interface Validation{
    required?:boolean;
    minLength?:number;
    maxLength?:number;
}

interface OrderElement{
    elementType: 'input'|'textarea'|'select',
    elementConfig:Object,
    value: string,
    validation?:Validation,
    valid:boolean,
    touched: boolean
}
interface OrderForm{
    name:OrderElement,
    street:OrderElement,
    zipCode:OrderElement,
    country:OrderElement,
    email:OrderElement,
    deliveryMethod:OrderElement,
    
}

const ContactData = (props: Props) => {
    const [isValid, isValidUpdate] = useState(false);
    const [orderForm, orderFormUpdate] = useState({
        name:{
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation:{
                required: true,
            },
            valid:false,
            touched: false
        },
        street:{
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Street'
            },
            value: '',
            validation:{
                required: true,
            },
            valid:false,
            touched: false
        },
        zipCode:{
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Zip Code'
            },
            value: '',
            validation:{
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid:false,
            touched: false
        },
        country:{
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Country'
            },
            value: '',
            validation:{
                required: true,
            },
            valid:false,
            touched: false
        },
        email:{
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation:{
                required: true,
            },
            valid:false,
            touched: false
        },

        deliveryMethod:{
            elementType: 'select',
            elementConfig: {
                options:[
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'},
                ]
            },
            value: 'fastest',
            valid:false,
            touched: false
        },
        

    } as OrderForm);
    const [loading, loadingUpdate] = useState(false);

    const history = useHistory();

    const orderSubmitHandler = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        console.log(props.ingredients);
        const order = {
            price: props.price,
            ingredients: props.ingredients,
            orderData: Object.fromEntries(Object.keys(orderForm).map(name=>{
                return [name, orderForm[name as keyof OrderForm].value];
            })),
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

    
    const checkValidity=(value:string, rules:Validation)=>{
        let isValid = true;
        if(rules.required){
            if(value.trim() === '')
                isValid = false;
        }
        if(rules.minLength){
            if(value.length < rules.minLength)
                isValid = false;
        }
        if(rules.maxLength){
            if(value.length > rules.maxLength)
                isValid = false;
        }
        return isValid;
    }
    const changeFormValidity = (updatedForm:OrderForm)=>{
        const valid = Object.values(updatedForm).reduce((isFormValid:boolean, element:OrderElement)=>{
            if(!element.validation)
                return isFormValid;
            return isFormValid&&element.valid;
        }, true);
        if(valid !== isValid){
            isValidUpdate(valid);
        }
        console.log(valid);
        
    };
    const inputChangedHandler = (id:keyof OrderForm, event:React.FormEvent<HTMLInputElement>)=>{
        const updatedForm = {...orderForm};
        updatedForm[id].value = event.currentTarget.value;
        updatedForm[id].touched = true;
        if(updatedForm[id].validation)
            updatedForm[id].valid = checkValidity(updatedForm[id].value, updatedForm[id].validation as Validation);
        orderFormUpdate(updatedForm);
        changeFormValidity(updatedForm);

        console.log(`${id}: ${event.currentTarget.value}`);
        console.log(`valid: ${updatedForm[id].valid}`);
    }
    
    let form = (
        <form onSubmit={orderSubmitHandler}>
            {
                Object.entries(orderForm).map(([idx, el] :[string, OrderElement])=>{
                    return (
                        <Input
                            key={idx} 
                            elementConfig={el.elementConfig} 
                            elementType={el.elementType}
                            value={el.value}
                            invalid={!el.valid}
                            shouldValidate={el.validation !== undefined}
                            touched={el.touched}
                            changed={inputChangedHandler.bind(null, idx as keyof OrderForm)}
                        />
                    );
                })
            }
            <Button btnType='Success' disabled={!isValid} clicked={()=>{}}>ORDER</Button>
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