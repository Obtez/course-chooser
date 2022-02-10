import {matchCourseTitle} from "../helpers/courseHelpers";

describe('test matching course title with id', () => {
    it('should return an object with empty values if nothing is passed in', () => {
        expect(matchCourseTitle('', [])).toEqual({id: '', title: ''})
    });
    it('should return an object with empty values if either argument is' +
        ' empty', () => {
        expect(matchCourseTitle('', [{id: 'testID', title: 'Test Title'}])).toEqual({id: '', title: ''})
        expect(matchCourseTitle('testID', [])).toEqual({id: '', title: ''})
    });
})
