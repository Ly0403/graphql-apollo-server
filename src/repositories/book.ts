import book from "../models/book.js";
import BaseRepository from "./base.js";

export default class BookRepository extends BaseRepository<BookDto> {
    constructor(){
        super(book);
    } 
}
