import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';

describe('Manage course page', () => {


    it('It shows error when saving with empty title', () => {
        //using mount method because we want the full dom in memore, ie with child components. Enzyme uses jsDom to create an in memory dom
        //This will require that the store is set up. You can either wrap the element in a Provider to mimick the actual application, or export the raw
        //unconnected type from the class (requires that you export the ManagedCoursePage element)
         let props = {
             course : {id:'', watchHref:'', title: '', authorId: '', length: '', category: ''},
             authors: [],
             actions:{
                 saveCourse: () =>{ return Promise.resolve()}
             }
         };    
        const wrapper = mount(<ManageCoursePage {...props}/>);

        let saveButton = wrapper.find('input').last();
        expect(saveButton.prop('type')).toBe('submit');

        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
    });
});   