import React from 'react'
import { mount, shallow } from 'enzyme'
import { MemoryRouter, Route } from 'react-router-dom'
import '../util/setup.js'

import Edit from './edit.js'
//jest.mock('react-router-dom')

let timeline = {
    name: 'test-timeline',
    dots: [{
        id: "alpha",
        content: "alpha content",
        start: new Date("2015-01-02")
    }, {
        id: "beta",
        content: "beta content",
        start: new Date("2016-01-02")
    }, {
        id: "gamma",
        content: "gamma content",
        start: new Date("2017-01-02")
    }]
}


describe('edit route', () => {
    it('should make a network call', () => {
        function mockFetch(data) {
            return jest.fn().mockImplementation(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(timeline)
                })
            )
        }
        global.fetch = mockFetch(JSON.stringify(timeline))
        const wrapper = mount(
            <MemoryRouter initialIndex={0} initialEntries={['/edit/test-timeline']}>
                <Route path="/edit/:name" component={Edit} />
            </MemoryRouter>
        )
        expect(global.fetch).toHaveBeenCalledTimes(2);
    })
})
