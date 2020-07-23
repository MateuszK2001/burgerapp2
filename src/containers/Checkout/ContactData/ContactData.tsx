import React, { useState, useEffect } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import AxiosOrders from '../../../axios-orders';
import { Ingredients } from "../../../store/types/Ingredients";
import Spinner from '../../../components/UI/Spinner/Spinner';
import { Validation } from '../../../components/UI/Form/Validation/Validation';
import InputSelect, { Option } from '../../../components/UI/Form/Inputs/InputSelect/InputSelect';
import InputText from '../../../components/UI/Form/Inputs/InputText/InputText';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { MergedState } from '../../../index';
import { ordersActions } from '../../../store/actions/ordersActions';

interface Props {
    ingredients: Ingredients;
    price: number;
    token: string|null;
    loading: boolean;
    purchase: (token:string, order:any)=>Promise<void>;
}



interface InputElement {
    elementConfig: any,
    value: string,
    valid: boolean,
    validation?: Validation,
}

interface SelectElement {
    elementConfig: any,
    value: string,
    valid: boolean;
    options: Option[];
}
function isInputOrSelect(o: InputElement | SelectElement): o is InputElement {
    return !('options' in o);
}


interface OrderForm {
    name: InputElement,
    street: InputElement,
    zipCode: InputElement,
    country: InputElement,
    email: InputElement,
    deliveryMethod: SelectElement,
}

const ContactData = (props: Props) => {
    const [isValid, isValidUpdate] = useState(false);
    const [orderForm, orderFormUpdate] = useState({
        name: {
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            valid: false,
            validation: {
                required: true,
            },
        },
        street: {
            elementConfig: {
                type: 'text',
                placeholder: 'Your Street'
            },
            value: '',
            valid: false,
            validation: {
                required: true,
            },
        },
        zipCode: {
            elementConfig: {
                type: 'text',
                placeholder: 'Your Zip Code'
            },
            value: '',
            valid: false,
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
        },
        country: {
            elementConfig: {
                type: 'text',
                placeholder: 'Your Country'
            },
            value: '',
            valid: false,
            validation: {
                required: true,
            },
        },
        email: {
            elementConfig: {
                type: 'text',
                placeholder: 'Your E-Mail'
            },
            value: '',
            valid: false,
            validation: {
                required: true,
            },
        },

        deliveryMethod: {
            elementConfig: {
            },
            options: [
                { value: 'fastest', displayValue: 'Fastest' },
                { value: 'cheapest', displayValue: 'Cheapest' },
            ],
            value: 'fastest',
            valid: true,
        },


    } as OrderForm);


    const orderSubmitHandler = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        const order = {
            price: props.price,
            ingredients: props.ingredients,
            orderData: Object.fromEntries(Object.keys(orderForm).map(name => {
                return [name, orderForm[name as keyof OrderForm].value];
            })),
        }

        props.purchase(props.token ? props.token : "", order);
    }

    useEffect(() => {
        const valid = Object.values(orderForm).reduce((isFormValid: boolean, element: InputElement | SelectElement) => {
            return isFormValid && element.valid;
        }, true);
        isValidUpdate(valid);

    }, [orderForm]); /// updating form validity

    const inputChangedHandler = (id: keyof OrderForm, value: string) => {
        const updatedForm = { ...orderForm };
        updatedForm[id].value = value;
        orderFormUpdate(updatedForm);
    }
    const validityChangedHandler = (id: keyof OrderForm, valid: boolean) => {
        const updatedForm = { ...orderForm };
        updatedForm[id].valid = valid;
        orderFormUpdate(updatedForm);
    }

    let form = (
        <form onSubmit={orderSubmitHandler}>
            {
                Object.entries(orderForm).map(([idx, el]: [string, InputElement | SelectElement]) => {
                    return (
                        isInputOrSelect(el)
                            ? (
                                <InputText
                                    key={idx}
                                    elementConfig={el.elementConfig}
                                    value={el.value}
                                    validation={el.validation}
                                    valueChanged={(val) => inputChangedHandler(idx as keyof OrderForm, val)}
                                    validChanged={(valid) => validityChangedHandler(idx as keyof OrderForm, valid)}
                                />
                            )
                            : (
                                <InputSelect
                                    key={idx}
                                    elementConfig={el.elementConfig}
                                    value={el.value}
                                    options={el.options}
                                    valueChanged={(val) => inputChangedHandler(idx as keyof OrderForm, val)}
                                    validChanged={(valid) => validityChangedHandler(idx as keyof OrderForm, valid)}
                                />
                            )
                    );
                })
            }
            <Button btnType='Success' disabled={!isValid} clicked={() => { }}>ORDER</Button>
        </form>
    );
    if (props.loading)
        form = <Spinner />


    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

const stateToProps = (state: MergedState) => {
    return {
        ingredients: state.burger.ingredients,
        price: state.burger.price,
        token: state.auth.token,
        loading: state.orders.loading
    }
};
const dispatchToProps = (dispatch:any)=>{
    return {
        purchase: (token:string, order:any)=>dispatch(ordersActions.purchase(token, order)),
    };
};

export default withErrorHandler(connect(stateToProps, dispatchToProps)(ContactData), AxiosOrders);