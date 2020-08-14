import ActionWithPayload from "../ActionWithPayload";
import Book from "../core/model/book";
import { BookState, initializeState } from "./book.state";
import * as BookActions from "./book.actions";
import { Action } from "@ngrx/store";

const initialState = initializeState();

export function BookReducer(state: BookState = initialState,
    action: Action) {

    switch (action.type) {
        case BookActions.GET_BOOK:            
            return { ...state, Loaded: false, Loading: true };

        case BookActions.ADD_BOOK:
            return ({
                ...state,
                BookList: state.BookList.concat((action as ActionWithPayload<Book[]>).payload),
                Loaded: false, Loading: true
            });

        default:
            return state;
    }
}