import * as actions from '../actions/booksActions';

export const initialState = {
  books: [],
  loading: false,
  hasErrors: false,
}

export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_BOOKS:
      console.log("GET_BOOKS.");
      return { ...state, loading: true };
    
    case actions.GET_BOOKS_SUCCESS:
      console.log("GET_BOOKS_SUCCESS.");
      return { books: action.payload, loading: false, hasErrors: false }
    
    case actions.GET_BOOKS_FAILURE:
      console.log("GET_BOOKS_FAILURE.");
      return { ...state, loading: false, hasErrors: true }
    //case actions.ADD_BOOK:

    default:
      return state;
  }
}