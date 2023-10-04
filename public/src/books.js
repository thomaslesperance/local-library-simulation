function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function getBookAvailability(book) {
  const borrows = book.borrows;
  return borrows[0].returned;
}

function partitionBooksByBorrowedStatus(books) {
  //Filter objects that are currently checked out to first array
  const unavailable = books.filter(book => !getBookAvailability(book));
  //Map objects that are available to second array
  const available = books.filter(book => getBookAvailability(book));
  //Return array 
  return [unavailable, available];
}

function getBorrowersForBook(book, accounts) {
  //Get account Ids from borrowed array of book input
  const accountIds = book.borrows.map(entry => entry.id);
  //Filter accounts array to new array of pulled account ids
  const accountsForBook = accounts.filter(account => {
    //Check if the account Id matches any one of the elements in the accountIds array
    return accountIds.some(id => account.id === id);
  });
  
  //Map through each object in filtered array
  const result = accountsForBook.map(account => {
    //Restructure each account object to insert returned property
    const {id, picture, age, name, company, email, registered} = account;
    //Get returned property of object in borrows array for book input associated with current id property
    const returned = book.borrows.find(entry => entry.id === id).returned;
    return {id, returned, picture, age, name, company, email, registered};  
  });

  //Trim length and return mapped array
  if (result.length <= 10) return result;
  else result.length = 10; return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};


//All tests are passing in Qualified.

// The project doesn't include any single-letter variables.

// The project makes at least one use of an arrow function.

// The project makes at least one use of each of the following native array methods: find(), filter(), map(), and reduce().

// The project employs at least one helper function, which helps support the tested functions.

// The project uses at least two of the following JavaScript features: the ternary operator, the spread operator, object shorthand, array or object destructuring, and for/in loops.