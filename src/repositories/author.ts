import author from "../models/author.js";
import BaseRepository from "./base.js";

export default class AuthorRepository extends BaseRepository<AuthorDto> {
    constructor(){
        super(author);
    } 
}
