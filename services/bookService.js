import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_JONAS_SERVICE_HOST

const service = (url) => axios.create({
    baseURL: url,
    timeout: 15000,
    headers: {"Authorization" : "Bearer " + process.env.NEXT_PUBLIC_JONAS_KEY}
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
