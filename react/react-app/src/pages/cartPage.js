import React from 'react';
import { Link } from 'react-router-dom';

import { CartItem } from '../components/cartItemComponent';

function cartCount() {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart == null || cart == undefined) {
    return [];
  }

  let count = 0;

  for (let index in cart) {
    count += cart[index].quantity;
  }

  return count;
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart == null || cart == undefined) {
    return [];
  }

  return cart;
}

const CartPage = ({ loading, hasErrors }) => {

  const renderCart = () => {
    if (loading) return <p>Loading books...</p>
    if (hasErrors) return <p>Unable to display books.</p>

    let books = loadCart();

    let bookComponents = [];
    for (let index in books) {
      bookComponents.push(<CartItem key={books[index].id} book={books[index]} />);
    }

    return bookComponents;
  };

  return (
    <section>
      <h1>Varukorg</h1>
      {renderCart()}
      <h3>Antal varor: {cartCount()}</h3>
      <br/>
      <Link to="/">
        <p>Tillbaka</p>
      </Link>
    </section>
  )
}

export default (CartPage)