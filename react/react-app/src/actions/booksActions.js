export const ADD_BOOK = 'ADD_BOOK';
export const GET_BOOKS = 'GET_BOOKS';
export const GET_BOOKS_FAILURE = 'GET_BOOKS_FAILURE';
export const GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS';

let nextBookId = 0
export const addBook = content => ({
  type: ADD_BOOK,
  payload: {
    id: ++nextBookId,
    content
  }
});

export const getBooks = () => ({
  type: GET_BOOKS,
});

export const getBooksSuccess = (books) => ({
  type: GET_BOOKS_SUCCESS,
  payload: books,
})

export const getBooksFailure = () => ({
  type: GET_BOOKS_FAILURE,
})

export function fetchBooks() {
  return async (dispatch) => {
    dispatch(getBooks());

    try {
      const response = await fetch('http://localhost:5000/books');
      const data = await response.json();
      dispatch(getBooksSuccess(data));
    } catch (error) {
      dispatch(getBooksFailure());
    }
  }
}