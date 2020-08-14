import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchBooks } from '../actions/booksActions';
import { Book } from '../components/bookComponent';

const BooksPage = ({ dispatch, loading, books, hasErrors }) => {
  useEffect(() => {    
    dispatch(fetchBooks())
  }, [dispatch]);
  
  const renderBooks = () => {   
    if (loading) return <p>Loading books...</p>    
    if (hasErrors) return <p>Unable to display books.</p>    
    return books.map((book) => <Book key={book.id} book={book} />)  
  };
  
  return (
    <section>
      <h1>Lilla Bokhandeln</h1>
      <Link to="/cart">
        <p>Visa varukorg</p>
      </Link>
      <br/>
      {renderBooks()}
    </section>
  )
}

const mapStateToProps = (state) => ({  
  loading: state.books.loading,  
  books: state.books.books,  
  hasErrors: state.books.hasErrors})

export default connect(mapStateToProps)(BooksPage)