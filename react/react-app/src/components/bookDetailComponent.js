import React from "react";
import { Link } from 'react-router-dom';

export const BookDetail = ({ book }) => (
  <div>
    <h3>{book.productName}</h3>
    <p>Författare: {book.authour}</p>
    <p>Kategori: {book.category}</p>
    <p>Betyg: {book.rating}</p>
    <p>Pris: {book.price}</p>
    <Link to="/">
        <button>Tillbaka</button>
    </Link>
  </div>
)