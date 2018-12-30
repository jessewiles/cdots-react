import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from '../util/setup.js';

import Dot from './Dot.js';

let adot = {
    id: "abcd",
    content: "this is content",
    start: new Date("2015-01-01")
};

describe('<Dot />', function () {
    it('should have content', () => {
        const wrapper = mount(<Dot dot={adot} />);
        expect(wrapper.find('input').first().prop('value')).to.equal('this is content');
    });
    it('should have start', () => {
        const wrapper = shallow(<Dot dot={adot} />);
        expect(wrapper.find('div').first().html()).to.include('<input type="text" class="form-control" value="2014-12-31"/>');
    });
});
