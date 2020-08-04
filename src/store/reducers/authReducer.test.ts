import reducer, { State, Action } from './authReducer';
import ActionTypes from '../actions/actionTypes';
 
describe('auth reducer', ()=>{
    it('should return the initial state', ()=>{
        // @ts-ignore
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error:null,
            redirectPath: '/'
        });
    });
    it('should store token upon login', ()=>{
        expect(reducer({
                token: null,
                userId: null,
                error:null,
                redirectPath: '/'
            }as State, {
                type: ActionTypes.AUTH_SUCCESSFUL,
                token: "tokenik",
                userId: "useroIdik"
            } as Action))
        .toEqual({
            token: "tokenik",
            userId: "useroIdik",
            error:null,
            redirectPath: '/'
        
        });
    });
     
});