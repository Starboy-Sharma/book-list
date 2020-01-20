// Book Class: Represents a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI tasks
class UI {
    static displayBooks() {
        const storedBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '34343344',
            },

            {
                title: 'Book Two',
                author: 'Jane Doe',
                isbn: '31325811',
            }
        ];

        const books = storedBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td> ${book.title} </td>
            <td> ${book.author} </td>
            <td> ${book.isbn} </td>
            <td> <a href="#" class="btn btn-danger btn-sm delete"> X </a> </td>
        `;

        // Append data here
        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {

            // Take confirmation from user

            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this book!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });

                        el.parentElement.parentElement.remove();
                    } else {
                        swal("Don't worry we will keep it safe!");
                    }
                });


        }
    }

    static showAlert() {
        // Show success Message
        swal({
            title: "Good job!",
            text: "You add a new book!",
            icon: "success",
            button: "Aww yiss!",
        });
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

}


// Store Class: Handle Storage

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
let bookForm = document.querySelector('#book_form');

bookForm.addEventListener('submit', (e) => {
    // Prevent Default action
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate book details

    if (title === '' || author === '' || isbn === '') {

        swal({
            title: "OOPS",
            text: "Please fill all fields",
            icon: "warning",
            dangerMode: true
        });

    } else {
        // Instantiate Book
        const book = new Book(title, author, isbn);

        // Add Book to UI
        UI.addBookToList(book);

        UI.showAlert();

        // Clear form fields
        UI.clearFields();


    }

});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
});
