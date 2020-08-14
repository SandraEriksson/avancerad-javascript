import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    useLocation
  } from "react-router-dom";

import { fetchBooks } from '../actions/booksActions';
import { BookDetail } from '../components/bookDetailComponent';

function GetId(){
    let location = useLocation();
    let idArr = location.pathname.split("/");
    let id = idArr[2]
    return id;
}


const BookPage = ({ dispatch, loading, books, hasErrors }) => {
  useEffect(() => {    
    dispatch(fetchBooks())
  }, [dispatch]);
  
  const renderBook = () => {   
    if (loading) return <p>Loading books...</p>    
    if (hasErrors) return <p>Unable to display books.</p>    

    let bookId = GetId();
    for (let index in books) {
        if(books[index].id == bookId) {
            return <BookDetail key={bookId} book={books[index]}/>
        }
    }
  };
  
  return (
    <section>
      <h1>Boken</h1>
      {renderBook()}
    </section>
  )
}

const mapStateToProps = (state) => ({  
  loading: state.books.loading,  
  books: state.books.books,  
  hasErrors: state.books.hasErrors})

export default connect(mapStateToProps)(BookPage)