import axios from 'axios'

const baseURL = 'https://safe-hamlet-62856.herokuapp.com/'
//const baseURL = 'http://127.0.0.1:8000/'


const service = (url) => axios.create({
    baseURL: url,
    timeout: 15000,
});

export function addBook(body) {
    return service(baseURL).post('add_book', body);
}

export function searchBook(query) {
    return service(baseURL).get('search_book?q=' + query);
}

export function consultIsbn(isbn) {
    return service(baseURL).get('consult_isbn?isbn=' + isbn);
}


