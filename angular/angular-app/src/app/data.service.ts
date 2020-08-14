import { Injectable, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Book from '../app/core/model/book';

import { Observable, Subscription } from 'rxjs';
import { BookState } from './store/book.state';
import ActionWithPayload from '../app/ActionWithPayload';
import { map } from 'rxjs/operators';
import { Store, select, Action } from '@ngrx/store';
import { ADD_BOOK, GET_BOOK } from '../app/store/book.actions';
import { BookReducer } from '../app/store/book.reducer';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = "http://localhost:5000/books";

  bookSubscription: Subscription;
  bookState$: Observable<Book[]>;
  completed: boolean = false;
  bookList: Book[];

  selected: Book;
  storedCart: Book[];

  constructor(private httpClient: HttpClient, private store: Store<BookState>) { }

  ngOnInit() { }

  public saveBooksToStore() {
    this.bookState$ = this.store.pipe(select('BookList'));

    var books: any;
    console.log("Books: " + books)
    this.bookSubscription = this.bookState$.pipe(map(x => books = x)).subscribe();

    if (books != undefined && books.BookList.length > 0) {
      return;
    }

    this.httpClient
      .get<Book[]>(this.REST_API_SERVER)
      .subscribe((data: Book[]) => {
        for (let i in data) {
          let createBookAction: ActionWithPayload<Book> = {
            type: ADD_BOOK,
            payload: {
              productName: data[i].productName,
              authour: data[i].authour,
              category: data[i].category,
              id: data[i].id,
              price: data[i].price,
              quantity: data[i].quantity,
              rating: data[i].rating
            }
          };
          
          this.store.dispatch(createBookAction);
        }
      });
  }

  addToCart(book: Book) {
    let storedCartJson: string = localStorage.getItem("cart");
    this.storedCart = JSON.parse(storedCartJson);

    if (this.storedCart == null) {
      this.storedCart = new Array() as Array<Book>;
    }

    let storedBook = this.storedCart.find(b => b.productName == book.productName);

    if (storedBook == null) {
      storedBook = {
        authour: book.authour,
        category: book.category,
        id: book.id,
        price: book.price,
        productName: book.productName,
        quantity: book.quantity,
        rating: book.rating
      } as Book;

      storedBook.quantity++;
      this.storedCart.push(storedBook);
    }
    else {
      for (let i in this.storedCart) {
        if (this.storedCart[i].productName == book.productName) {
          this.storedCart[i].quantity++;
        }
      }
    }

    localStorage.setItem("cart", JSON.stringify(this.storedCart));
  }

  removeFromCart(book: Book) {

    let storedCartJson: string = localStorage.getItem("cart");
    this.storedCart = JSON.parse(storedCartJson);

    if (this.storedCart == null) {
      return;
    }

    let storedBook = this.storedCart.find(b => b.productName == book.productName);

    if (storedBook == null) {
      return;
    }
    else {
      for (let i in this.storedCart) {
        if (this.storedCart[i].productName == storedBook.productName) {
          let quantity = this.storedCart[i].quantity;
          quantity--;

          if (quantity <= 0) {
            let index = this.storedCart.findIndex(b => b.productName == storedBook.productName);
            this.storedCart.splice(index, 1);
          }
          else {
            this.storedCart[i].quantity = quantity;
          }
        }
      }
    }

    localStorage.setItem("cart", JSON.stringify(this.storedCart));
  }

  getCart() {
    let storedCartJson: string = localStorage.getItem("cart");
    this.storedCart = JSON.parse(storedCartJson);

    if (this.storedCart == null) {
      this.storedCart = new Array() as Array<Book>;
    }

    return this.storedCart;
  }

  getCartCount(): number {
    let count = 0;
    let cart = this.getCart();
    for (let i in cart) {
      count += cart[i].quantity;
    }
    return count;
  }

  getBookFromCart(productName: string): Book {
    let storedCartJson: string = localStorage.getItem("cart");
    this.storedCart = JSON.parse(storedCartJson);

    if (this.storedCart == null) {
      return null;
    }

    for (let i in this.storedCart)
      if (this.storedCart[i].productName == productName) {
        return this.storedCart[i]
      }

    return null;
  }
}
