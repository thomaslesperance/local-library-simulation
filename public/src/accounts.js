function getAccountId({id}) {
  return id;
}

function getAuthorById(authors, authorId) {
  return authors.find(author => author.id === authorId);
}

function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => {
    const nameA = accountA.name.last.toLowerCase();
    const nameB = accountB.name.last.toLowerCase();
    return nameA > nameB ? 1 : -1;
  });
  
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  //Go through each book object in books (borrows array)
  return books.reduce((total, {borrows}) => {
    //Filter the array for id === function input
    const borrowedById = borrows.filter(({id}) =>
      id === getAccountId(account));
    
    //Count the length of filtered array and return length + accumulator
    return total += borrowedById.length;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  //Go through each book in books array
  const checkedOutById = books.filter(book => {
    //Get most recent borrow
    const mostRecentBorrow = book.borrows[0];
    //Check if most recent borrow is false and if it matches account Id input
    if (mostRecentBorrow.returned === false && 
        mostRecentBorrow.id === getAccountId(account)) {
      return true;
    }
  });

  return checkedOutById.map(book => {
    //Break each book property into separate pieces
    const {id, title, genre, authorId, borrows} = book;
    //Get author object associated with authorId
    const author = authors.find(author => authorId === author.id);
    //Object shorthand to reconstruct return book object
    return {id, title, genre, authorId, author, borrows};
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

//All tests are passing in Qualified.

// The project doesn't include any single-letter variables.

// The project makes at least one use of an arrow function.

// The project makes at least one use of each of the following native array methods: find(), filter(), map(), and reduce().

// The project employs at least one helper function, which helps support the tested functions.

// The project uses at least two of the following JavaScript features: the ternary operator, the spread operator, object shorthand, array or object destructuring, and for/in loops.


// //Go through all book objects (their borrows array) in books
// const booksCheckedOutByAccount = books.filter(book => {
//   //Check if that array has an object with the returned property set to false & id property matches accountId 
//   return book.borrows.some(element => {
//     element.returned === false &&
//     element.id === getAccountId(account)
//   });  
// });

// //Go through each item in the new array
// const result = booksCheckedOutByAccount.map(book => {
//   //Destructure book object into separate pieces
//   const {id, title, genre, authorId, borrows} = book;
//   //Get the author object associated with the author id of the item
//   const author = getAuthorById(authors, authorId);
//   //Reassemble pieces, inserting author object BETWEEN authorId and borrows
//   const bookObject = {id, title, genre, authorId, author, borrows};
//   //Return reassembled object to .map() method
//   return bookObject;
// });

// return result;
// //return result