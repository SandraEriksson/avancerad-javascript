import Book from "../core/model/book";

export interface BookState {
    Loading: boolean;
    Loaded: boolean;
    BookList: Book[];
}

export const initializeState = (): BookState => {
    return ({
        BookList: [],
        Loading: false,
        Loaded: true
    });
}