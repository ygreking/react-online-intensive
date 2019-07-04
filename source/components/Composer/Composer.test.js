// Core
import { Composer } from './';

const props = {
    _createPost:          jest.fn(),
    avatar:               'image.png',
    currentUserFirstName: 'Lisa',
};

const comment = 'Merry Christmas!';

const initialState = {
    comment: '',
};

const updatedState = {
    comment,
};

const result = mount(<Composer { ...props } />);

const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');
const _updateCommentSpy = jest.spyOn(result.instance(), '_updateComment');
const _submitOnEnterSpy = jest.spyOn(result.instance(), '_submitOnEnter');

describe('composer component:', () => {
    test('should have 1 «section» element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('should have 1 «form» element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('should have 1 «textarea» element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('should have 1 «input» element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('should have 1 «img» element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('image source should be taken from props', () => {
        expect(result.find('img').prop('src')).toEqual(props.avatar);
    });

    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });

    test('textarea should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('textarea placeholder should contain currentUserFirstName from props', () => {
        expect(result.find('textarea').prop('placeholder')).toEqual(
            expect.stringContaining(props.currentUserFirstName),
        );
    });

    test('should respond to state change properly', () => {
        result.setState({
            comment,
        });

        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);

        result.setState({
            comment: '',
        });

        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('should handle textarea «change» event', () => {
        result.find('textarea').simulate('change', {
            target: { value: comment },
        });
        expect(result.find('textarea').text()).toBe(comment);
        expect(result.state()).toEqual(updatedState);
    });

    test('should handle form «submit» event', () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(initialState);
    });

    test('_createPost should be invoked once after form submission', () => {
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test('_submitComment and _handleFormSubmit class methods should be invoked once after form is submitted', () => {
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    });

    test('_updateComment should be invoked on «change» event in textarea', () => {
        jest.clearAllMocks();
        result.find('textarea').simulate('change');
        expect(_updateCommentSpy).toBeCalledTimes(1);
    });

    test('_submitOnEnter should be invoked on «keypress» event in textarea', () => {
        jest.clearAllMocks();
        result.find('textarea').simulate('keypress');
        expect(_submitOnEnterSpy).toHaveBeenCalledTimes(1);
    });

    test('_submitOnEnter should call _submitComment if Enter key was hit', () => {
        jest.clearAllMocks();
        result.instance()._submitOnEnter({ key: 'Enter', preventDefault: () => {} });
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
    });

    test('_submitComment should return null if comment is empty', () => {
        jest.clearAllMocks();
        result.setState({
            comment: '',
        });
        expect(result.instance()._submitComment()).toBeNull();
    });

    test('_submitComment should call _createPost if comment is not empty', () => {
        jest.clearAllMocks();
        result.setState({
            comment,
        });
        result.instance()._submitComment();
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });
});
