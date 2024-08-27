
import { v4 as uuidv4 } from 'uuid';


export const mockProducts = [
 
  {
    id: uuidv4(),
    name: 'Sony WH-1000XM4',
    price: 349.99,
    imageUrl: 'https://cdn.pixabay.com/photo/2019/07/21/21/32/laptop-4353711_960_720.png',
    description: 'Sony WH-1000XM4 wireless noise-canceling headphones with premium sound quality and adaptive noise control.',
    category: 'Electronics',
  },
  {
    id: uuidv4(),
    name: 'Dell XPS 13',
    price: 1299.99,
    imageUrl: 'https://cdn.pixabay.com/photo/2012/04/13/20/24/laptop-33521_960_720.png',
    description: 'The Dell XPS 13 laptop features a sleek design, Intel Core i7 processor, and a beautiful InfinityEdge display.',
    category: 'Electronics',

  },
  {
    id: uuidv4(),
    name: 'Apple MacBook Pro 16"',
    price: 2399.99,
    imageUrl: 'https://cdn.pixabay.com/photo/2014/12/09/23/40/macbook-562499_1280.png',
    description: 'The Apple MacBook Pro 16" offers immense power with M1 Pro or M1 Max chip, ProMotion display, and superior performance.',
    category: 'Electronics',

  },
  
];



export function saveMockDataToLocalStorage() {
    // Check if the data already exists
    if (!localStorage.getItem('products')) {
      localStorage.setItem('products', JSON.stringify(mockProducts));
    }
  }