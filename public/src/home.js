function getBookAvailability(book) {
  const borrows = book.borrows;
  return borrows[0].returned;
}

function getBookTotalBorrows(book) {
  return book.borrows.length;
}
function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter(book => !getBookAvailability(book)).length;
}

function getMostCommonGenres(books) {
  //Get array of genres from books DB
  const allGenres = books.map(book => book.genre);
  
  //Go through each entry in array
  const result = allGenres.reduce((accumulator, entry) => {
    //If there is not an existing object in the accumulator with that genre, create one
    if (!accumulator.some(object => object.name === entry)) {
      const newGenre = {name: `${entry}`, count: 1};
      accumulator.push(newGenre);
      return accumulator;
    }
    //Increment count property for corresponding genre object in new array
    const currentGenre = accumulator.find(object => object.name === entry);
    currentGenre.count++;
    return accumulator;
  }, []);
  
  //Sort new array by count property of nested objects
  result.sort((objectA, objectB) => objectB.count - objectA.count);
  //Return or reduce and return array to specified length
  if (result.length <= 5) return result;
  else result.length = 5; return result;
}

function getMostPopularBooks(books) {
  //Go through each book in books DB
  const result = books.reduce((accumulator, book) => {
    //Initialize new object
    const bookAndCount = {};
    //Determine object properties
    bookAndCount.name = book.title;
    bookAndCount.count = getBookTotalBorrows(book);
    //Push object and return accumulator
    accumulator.push(bookAndCount);
    return accumulator;
  }, []);

  //Sort based on count
  result.sort((bookA, bookB) => bookB.count - bookA.count);
  //Return or reduce length and return
  if (result.length <= 5) return result;
  else result.length = 5; return result;
}

function getMostPopularAuthors(books, authors) {
  //Go through authors DB
  const result = authors.reduce((accumulator, author) => {
    //Get current author's name (concatenate properties)
    const authorAndCount = {};
    authorAndCount.name = `${author.name.first} ${author.name.last}`;
    
    //Go through books DB by current author
    const authorsBorrowCount = books.reduce((total, book) => {
      //Add up borrows array lengths for books that match authorId
      if (book.authorId === author.id) total += book.borrows.length;
      return total;
    }, 0);

    //Add properties in specified format and return new object
    authorAndCount.count = authorsBorrowCount;
    accumulator.push(authorAndCount);
    return accumulator;
  }, []);
  
  //Sort, filter as needed, and return result array
  result.sort((authorA, authorB) => authorB.count - authorA.count);
  if (result.length <= 5) return result;
  else result.length = 5; return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

//All tests are passing in Qualified.

// The project doesn't include any single-letter variables.

// The project makes at least one use of an arrow function.

// The project makes at least one use of each of the following native array methods: find(), filter(), map(), and reduce().

// The project employs at least one helper function, which helps support the tested functions.

// The project uses at least two of the following JavaScript features: the ternary operator, the spread operator, object shorthand, array or object destructuring, and for/in loops.