import axios from 'axios'

const service = (url) => axios.create({
    baseURL: url,
    timeout: 15000,
});

export function addBook(body) {
    return service('http://127.0.0.1:8000/').post('add_book', body);
}

export function searchBook(query) {
    return service('http://127.0.0.1:8000/').get('search_book?q=' + query);
}

export function consultIsbn(isbn) {
    return service('http://127.0.0.1:8000/').get('consult_isbn?isbn=' + isbn);
}


