import expect from 'expect';
import {authorsFormattedForDropdown} from './selectors';

describe('Author selectors', () => {

    describe('authors for drowpsown', () => {
        it('should return author data formated for use in dropdown', () =>{
            const authors = [
                {id:'cory-house', firstName: 'Cory', lastName: 'House'},
                {id:'acott-allen', firstName: 'Scott', lastName: 'Allen'}
            ];
            const expected = [
                {value:'cory-house', text: 'Cory House'},
                {value:'acott-allen', text:'Scott Allen'}
            ];

            expect(authorsFormattedForDropdown(authors)).toEqual(expected);
        });
    });
});