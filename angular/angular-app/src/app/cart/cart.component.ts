import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import Book from '../core/model/book'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart = [];
  cartCount = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadData();
  }

  addToCart(book: Book) {
    this.dataService.addToCart(book);
    this.loadData();
  }

  removeFromCart(book: Book) {
    this.dataService.removeFromCart(book);
    this.loadData();
  }

  loadData() {
    this.cart = this.dataService.getCart();
    this.cartCount = this.dataService.getCartCount();
  }
}
