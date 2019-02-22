import React from 'react'
import { shallow } from 'enzyme'
import '../../util/setup.js'

import TimelineList from './TimelineList.js'

let timelines = [{
    id: 'abc',
    name: 'omega',
    dots: [{
        id: "alpha",
        content: "alpha content",
        start: "2015-01-12T00:00:00Z"
    }, {
        id: "beta",
        content: "beta content",
        start: "2017-01-12T00:00:00Z"
    }, {
        id: "gamma",
        content: "gamma content",
        start: "2019-01-12T00:00:00Z"
    }]
}, {
    id: 'def',
    name: 'alpha',
    dots: [{
        id: "alpha",
        content: "alpha content",
        start: "2015-01-12T00:00:00Z"
    }, {
        id: "beta",
        content: "beta content",
        start: "2017-01-12T00:00:00Z"
    }, {
        id: "gamma",
        content: "gamma content",
        start: "2019-01-12T00:00:00Z"
    }]
}]


describe('<TimlineList />', () => {
    test('Sorts list by name', () => {
        let wrapper
        let mockFetch = (data) => {
            return jest.fn().mockImplementation(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        then: async (f, r) => {
                            f(data)
                            await Promise.resolve({})
                            wrapper.update()
                            expect(wrapper.instance().state.timelines.length).toBe(2)
                            expect(wrapper.instance().state.timelines[0].name).toEqual('alpha')
                        }
                    })
                })
            )
        }
        global.fetch = mockFetch(timelines) // eslint-disable-line no-undef
        wrapper = shallow(<TimelineList />)
    })
})
