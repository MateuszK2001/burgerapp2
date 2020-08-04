import { _BurgerBuilder } from "./BurgerBuilder";
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow, ShallowWrapper } from "enzyme";
import buildControls from "../../components/Burger/BuildControls/BuildControls";

configure({adapter: new Adapter() });

describe("<BurgerBuilder />", ()=>{
    let wrapper:ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
    beforeEach(()=>{
        // @ts-ignore
        wrapper = shallow(<_BurgerBuilder />);
    });
    it('should render <BuildControls /> when has ingredients', ()=>{
        wrapper.setProps({
            ingredients: {
                salad: 0,
                bacon: 0,
                meat: 0,
                cheese: 0
            }
        });
        expect(wrapper.find(buildControls)).toBeTruthy();
    });
});