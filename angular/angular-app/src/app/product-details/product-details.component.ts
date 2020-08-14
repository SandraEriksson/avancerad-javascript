import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import Book from '../core/model/book'
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BookState } from '../store/book.state';
import { map } from 'rxjs/operators';
import { Store, select, Action } from '@ngrx/store';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  selectedBookId: string;
  selectedBook: Book;
  bookSubscription: Subscription;
  bookState$: Observable<Book[]>;
  completed: boolean = false;
  bookList: any;

  constructor(private dataService: DataService, private route: ActivatedRoute, private store: Store<BookState>) {
    this.selectedBook = { productName: "", id: 0, authour: "", category: "", price: 0, quantity: 0, rating: 0 };
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedBookId = params['bookId'];
    });

    this.bookState$ = this.store.pipe(select('BookList'));
    this.bookSubscription = this.bookState$.pipe(map(x => this.bookList = x)).subscribe();

    for (let i in this.bookList.BookList) {
      if (this.bookList.BookList[i].productName == this.selectedBookId) {
        this.selectedBook = this.bookList.BookList[i] as Book;
      }
    }
  }
}
