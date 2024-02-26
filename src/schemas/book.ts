const bookSchema = `
type Book {
    id: String
    title: String
    author: String
    quantity: Int
}

type Author{
    id: String
    name: String
} 

union SearchResult = Book|Author 

input BookInput {
    id: String
    title: String
    author: String
    quantity: Int
}

input AuthorInput {
    id: String
    name: String
}
  
type Query{
    getBooks:[Book]
    search(key:String):[SearchResult!]
}

type Mutation{
    addBook(book:BookInput):Book
    addauthor(author:AuthorInput):Author
}

`;

export default bookSchema;
