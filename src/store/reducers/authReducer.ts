import ActionTypes from "../actions/actionTypes";
import updateObject from "../utility";

const initialState = {
    token: null,
    userId: null,
    error:null
};
export interface State {
    token: string | null,
    userId: string | null,
    error: string | null,
}
export interface Action {
    type: ActionTypes,
    token: string | null,
    userId: string | null,
    error: string | null,

}

const authReducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.AUTH_LOGOUT:
            return updateObject(state,{
                token: null,
                userId: null
            });
        case ActionTypes.AUTH_START:
            return updateObject(state, {
                error: null,
                token: null,
                userId: null,
            });
        case ActionTypes.AUTH_SUCCESSFUL:
            return updateObject(state, {
                token: action.token,
                userId: action.userId,
            });
        case ActionTypes.AUTH_FAILED:
            return updateObject(state, {
                error: action.error
            });
    }
    return state;
};

export default authReducer;