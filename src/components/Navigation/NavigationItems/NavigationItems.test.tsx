import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', ()=>{
    let wrapper:ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems isAuthenticated={false} />);
    });

    it('should render two <navigationItem /> elements if not authenticated', ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render three <navigationItem /> elements if is authenticated', ()=>{
        wrapper.setProps({
            isAuthenticated: true
        });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should render logout element if is authenticated', ()=>{
        wrapper.setProps({
            isAuthenticated: true
        });
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});