import React from "react";
import { Link } from 'react-router-dom';
import bookPage from "../pages/bookPage";

function addToCart(book) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart == null || cart == undefined) {
    cart = [];
  }

  let added = false;

  if (cart.length > 0) {
    for (let index in cart) {
      if (cart[index].id == book.id) {
        book.quantity = cart[index].quantity;
        book.quantity++;

        cart.splice(index, 1, book);
        added = true;
      }
    }
    if (added == false) {
      book.quantity++;
      cart.push(book);
    }
  }
  else {
    book.quantity++;
    cart.push(book);
  }

  let cartJson = JSON.stringify(cart);
  localStorage.setItem("cart", cartJson);
}

export const Book = ({ book, bookUrl = "/books/" + book.id }) => (
  <div>
    <Link to={{
      pathname: bookUrl,
      component: bookPage
    }}>
      <h3>{book.productName}</h3>
    </Link>
    <p>Författare: {book.authour}</p>
    <p>Betyg: {book.rating}</p>
    <button onClick={() => addToCart(book)}>Lägg till</button>
  </div>
)