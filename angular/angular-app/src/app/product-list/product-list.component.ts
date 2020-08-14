import { Component } from '@angular/core';
import Book from "../core/model/book";
import { DataService } from '../data.service';
import { Observable, Subscription } from 'rxjs';
import { BookState } from '../store/book.state';
import { map } from 'rxjs/operators';
import { Store, select, Action } from '@ngrx/store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent {
  bookSubscription: Subscription;
  bookState$: Observable<Book[]>;
  completed: boolean = false;
  bookList: Book[];
  constructor(private dataService: DataService, private store: Store<BookState>) { }

  addToCart(book: Book) {
    this.dataService.addToCart(book);
  }
 
  ngOnInit() {  
    this.dataService.saveBooksToStore(); 
    this.bookState$ = this.store.pipe(select('BookList'));
    this.bookSubscription = this.bookState$.pipe(map(x => this.bookList = x)).subscribe();
  }
}