// lib/products.ts

export type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    imageUrl: string;
  };
  
  /**
   * Fetch a product by ID from localStorage.
   * @param id - The ID of the product to fetch.
   * @returns The product object if found, otherwise null.
   */
  export function getProductById(id: string): Product | null {
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        const products: Product[] = JSON.parse(storedProducts);
        return products.find((product) => product.id === id) || null;
      }
      return null;
    } catch (error) {
      console.error('Error fetching product from localStorage:', error);
      return null;
    }
  }
  