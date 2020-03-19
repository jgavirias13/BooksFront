import { Book } from './book.model';

export interface User{
    _id: string;  
    name: string;
    username: string;
    favoritos: Array<Book>;
  }
  