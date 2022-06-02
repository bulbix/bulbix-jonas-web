import axios from 'axios'

const service = (url) => axios.create({
    baseURL: url,
    timeout: 15000,
});

export function addBook(body) {
    return service('http://127.0.0.1:5000/').post('add_book', body);
}

export function searchBook(title, author) {
    return service('http://127.0.0.1:5000/').get('search_book?title=' + title + '&author=' + author);
}

export function consultIsbn(isbn) {
    return service('http://127.0.0.1:5000/').get('consult_isbn?isbn=' + isbn);
}


