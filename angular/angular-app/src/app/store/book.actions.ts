import { Action } from "@ngrx/store";
import ActionWithPayload from "../ActionWithPayload";
import Book from "../core/model/book";

export const GET_BOOK = '[Book] GET_BOOK';
export const ADD_BOOK = '[Book] ADD_BOOK';

export class GetBook implements Action {
    readonly type = GET_BOOK;

    constructor() { }
}

export class AddBook implements ActionWithPayload<Book> {
    readonly type = ADD_BOOK;
    payload: Book;

    constructor(payload: Book) {
        this.payload = payload;
    }
}

export type All = GetBook | AddBook ;