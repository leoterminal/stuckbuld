// components/ProductFilter.tsx
import { ChangeEvent } from 'react';

type ProductFilterProps = {
  category: string;
  maxPrice: number;
  onCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ProductFilter: React.FC<ProductFilterProps> = ({ category, maxPrice, onCategoryChange, onPriceChange }) => {
  return (
    <div className="flex mb-4">
      <div className="mr-4">
        <label className="block text-gray-700">Category</label>
        <select
          value={category}
          onChange={onCategoryChange}
          className="border p-2 rounded"
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          
        </select>
      </div>

      <div>
        <label className="block text-gray-700">Max Price</label>
        <input
          type="number"
          value={maxPrice}
          onChange={onPriceChange}
          className="border p-2 rounded"
          placeholder="Any"
        />
      </div>
    </div>
  );
};

export default ProductFilter;
