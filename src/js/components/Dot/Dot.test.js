import React from 'react'
import { mount, shallow } from 'enzyme'
import '../../util/setup.js'

import Dot from './Dot.js'

let adot = {
    id: "abcd",
    content: "this is content",
    start: new Date("2015-01-02")
}

describe('<Dot />', function() {
    it('should have content', () => {
        const wrapper = mount(<Dot dot={adot} />)
        expect(wrapper.find('input').first().prop('value')).toBe('this is content')
    })
    it('should have start', () => {
        const wrapper = shallow(<Dot dot={adot} />)
        expect(wrapper.find('div').first().html()).toContain('<input type="text" class="form-control" value="2015-01-')
    })
})
