import axios from 'axios'

const baseURL = 'https://safe-hamlet-62856.herokuapp.com/'
//const baseURL = 'http://127.0.0.1:8000/'


const service = (url) => axios.create({
    baseURL: url,
    timeout: 15000,
});

export function addBook(body) {
    return service(baseURL).put('add_book', body);
}

export function updateBook(body) {
    return service(baseURL).post('update_book', body);
}

export function searchBook(query, sold) {
    return service(baseURL).get(`search_book?q=${query}&sold=${sold}`);
}

export function consultIsbn(isbn) {
    return service(baseURL).get('consult_isbn?isbn=' + isbn);
}


