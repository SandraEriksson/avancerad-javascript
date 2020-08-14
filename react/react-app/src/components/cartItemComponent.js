import React, { useState } from "react";
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

  window.location.reload();
}

function removeFromCart(book) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart == null || cart == undefined) {
    cart = [];
  }

  for (let index in cart) {
    if (cart[index].id == book.id) {
      book.quantity = cart[index].quantity;
      book.quantity--;

      if (book.quantity <= 0) {
        cart.splice(index, 1,);
      }
      else {
        cart.splice(index, 1, book);
      }
    }
  }

  let cartJson = JSON.stringify(cart);
  localStorage.setItem("cart", cartJson);

  window.location.reload();
}

export const CartItem = ({ book, bookUrl = "/books/" + book.id }) => (
  <div>
    <Link to={{
      pathname: bookUrl,
      component: bookPage
    }}>
      <h3>{book.productName}</h3>
    </Link>
    <p>Antal: {book.quantity}</p>
    <button onClick={() => removeFromCart(book)}>Minska antal</button>
    <button onClick={() => addToCart(book)}>Öka antal</button>
  </div>
)