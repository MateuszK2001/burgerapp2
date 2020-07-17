import { Ingredients } from "../types/Ingredients";
import ActionTypes from "./actionTypes";
import AxiosOrders from "../../axios-orders";

var burgerActions ={
    fetchIngredients: ()=>{
        return (dispatch:any)=>{
            return AxiosOrders.get('/ingredients.json')
                .then(response => {
                    dispatch({type: ActionTypes.SET_INGREDIENTS, ingredients: {
                        salad: response.data.salad,
                        bacon: response.data.bacon,
                        cheese: response.data.cheese,
                        meat: response.data.meat,
                    }})
                })
                .catch(err=>{})
        };
    },
    addIngredient: (ingredientType:keyof Ingredients)=>(
        {type: ActionTypes.ADD_INGREDIENT, ingredientType:ingredientType}
    ),
    removeIngredient: (ingredientType:keyof Ingredients)=>(
        {type: ActionTypes.REMOVE_INGREDIENT, ingredientType:ingredientType}
    ),
};

export default burgerActions;