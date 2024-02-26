import { GraphQLError } from "graphql";
import BookRepository from "../repositories/book.js";
import AuthorRepository from "../repositories/author.js";

const bookRepository = new BookRepository();
const authorRepository = new AuthorRepository();

const bookResolvers = {
  SearchResult: {
    __resolveType(obj: BookDto & AuthorDto) {
      if (obj.name) {
        return "Author";
      }
      if (obj.title) {
        return "Book";
      }
      return null;
    },
  },
  Query: {
    getBooks() {
      const books = bookRepository.findAll();
      return books;
    },
    search(parent, args: { key: string }, context) {
      if (args.key === "") {
        throw new GraphQLError("no key is prvided", {
          extensions: {
            code: "MISSING KEY ERROR",
            http: { status: 400 },
          },
        });
      }
      const bookRes = bookRepository.findOne({ title: args.key });
      const authorRes = authorRepository.findOne({ name: args.key });
      return [bookRes, authorRes];
    },
  },
  Mutation: {
    addBook(parent, args: { book: BookDto }) {
      const books = bookRepository.create(args.book);
      return books;
    },
    addauthor(parent, args: { author: AuthorDto }) {
      const authors = authorRepository.create(args.author);
      return authors;
    },
  },
};

export default bookResolvers;
