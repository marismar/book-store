import axios from 'axios';

export interface BaseBook {
  title: string;
  description: string;
  authorName: string;
  cover: string;
  price: string;
  sellerEmail: string;
}

export interface Book extends BaseBook {
  id: string;
  createdAt: string;
}

export type CallbacksAPI<T> = {
  onSuccess: (books: T) => void;
  onError: (error: any) => void;
};

const api = axios.create({
  baseURL: 'https://67f9e0c2094de2fe6ea29337.mockapi.io',
});

export const fetchBooks = async ({
  onSuccess,
  onError,
}: CallbacksAPI<Book[]>): Promise<Book[] | undefined> => {
  try {
    const response = await api.get('/books');
    const data = response.data;
    onSuccess(data);
    return data;
  } catch (error) {
    onError(error);
    console.error('Error fetching books:', error);
  }
};

export const fetchBook = async (
  id: string,
  { onSuccess, onError }: CallbacksAPI<Book>
): Promise<Book | undefined> => {
  try {
    const response = await api.get(`/books/${id}`);
    const data = response.data;
    onSuccess(data);
    return data;
  } catch (error) {
    onError(error);
    console.error(`Error fetching book ${id}:`, error);
  }
};

export const deleteBook = async (
  id: string,
  { onSuccess, onError }: CallbacksAPI<Book>
): Promise<Book | undefined> => {
  try {
    const response = await api.delete(`/books/${id}`);
    const data = response.data;
    onSuccess(data);
    return data;
  } catch (error) {
    onError(error);
    console.error(`Error deleting book: ${id}`, error);
  }
};

export const updateBook = async (
  book: Book,
  { onSuccess, onError }: CallbacksAPI<Book>
): Promise<Book | undefined> => {
  try {
    const response = await api.put(`/books/${book.id}`, {
      title: book.title,
      description: book.description,
      authorName: book.authorName,
      cover: book.cover,
      price: book.price,
      sellerEmail: book.sellerEmail,
    });
    const data = response.data;
    onSuccess(data);
    return data;
  } catch (error) {
    onError(error);
    console.error(`Error updating book: ${book.id}`, error);
  }
};

export const addBook = async (
  { title, description, authorName, cover, price, sellerEmail }: BaseBook,
  { onSuccess, onError }: CallbacksAPI<Book>
): Promise<Book | undefined> => {
  try {
    const response = await api.post('/books', {
      title,
      description,
      authorName,
      cover,
      price,
      sellerEmail,
    });
    const data = response.data;
    onSuccess(data);
    return data;
  } catch (error) {
    onError(error);
    console.error('Error adding book:', error);
  }
};
