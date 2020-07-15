import Actions from "./actions";
import { Ingredients } from "./types/Ingredients";
import { Reducer } from 'redux';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
const calculatePrice = (ingredients:Ingredients)=>{
    if(ingredients === null){
        return 0;
    }
    let newPrice = 0;
    Object.entries(ingredients).forEach(([key, cnt]: [string, number]) => {
        newPrice += (INGREDIENT_PRICES[key as keyof Ingredients] * cnt);
    });
    return newPrice;
}

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    } as Ingredients,
    purchasable: false,
    price: 0
};
export interface State {
    ingredients: Ingredients;
    purchasable: boolean;
    price:number;
}
export interface Action {
    type: Actions;
    ingredients?: Ingredients;
    purchasable?: boolean;
    price?:number;
    ingredientType?:keyof Ingredients;
}

const reducer: Reducer<State, Action> = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case Actions.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: { ...action.ingredients! },
                price: calculatePrice(action.ingredients!),
                purchasable: calculatePrice(action.ingredients!)>0
            } as State;
        case Actions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType!]: state.ingredients[action.ingredientType!]+1,
                },
                price: state.price+INGREDIENT_PRICES[action.ingredientType!],
                purchasable: state.price+INGREDIENT_PRICES[action.ingredientType!]>0
            }
        case Actions.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType!]: state.ingredients[action.ingredientType!]-1,
                },
                price: state.price-INGREDIENT_PRICES[action.ingredientType!],
                purchasable: state.price-INGREDIENT_PRICES[action.ingredientType!]>0
            }
        
    }
    return state;
}

export default reducer;