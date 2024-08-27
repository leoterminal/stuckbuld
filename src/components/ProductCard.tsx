// components/ProductCard.tsx
import Link from 'next/link';
import { Product } from '../utils/types';

type ProductCardProps = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <div
      key={product.id}
      className="relative w-full max-w-[305px] h-[488px] bg-white rounded-[18.48px] border-2 border-[#f7f5f7] group hover:scale-105 hover:shadow-lg"
    >
      <div className="w-full h-[303.12px] bg-[#f7f5f7] rounded-tl-[18.48px] rounded-tr-[18.48px] p-3">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="size-full object-fill"
        />
      </div>
      <div className="w-full h-[77px] absolute top-[325px] px-[20.71px] bg-[#ffffff]">
        <div className="text-[#667084] text-lg font-medium">{product.name}</div>
        <div className="text-[#98a1b2] text-sm">{product.category}</div>
        <div className="text-[#344053] text-lg font-bold">${product.price}</div>
      </div>
      <div className="w-full h-9 flex gap-2 absolute bottom-4 px-[21px]">
        <Link href={`/pages/products/${product.id}`}>
          <div className="w-full h-9 px-3.5 py-2 bg-[#3a4980] text-white text-sm font-semibold rounded-full shadow border border-[#3a4980] flex items-center justify-center">View Details</div>
        </Link>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition duration-200">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(product); }}
            className="text-green-500 hover:text-green-600 mr-2"
          >
            {/* Edit Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
            className="text-red-500 hover:text-red-600"
          >
            {/* Delete Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
