'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head'; // Import Head from next/head
import { notFound } from 'next/navigation';


type Product = {
  id: string; 
  name: string;
  category: string;
  price: number; // Ensure this is a number
  description: string;
  imageUrl: string;
};

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const productId = params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        const products: Product[] = JSON.parse(storedProducts);
        const foundProduct = products.find((p) => p.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          notFound();
        }
      } else {
        notFound();
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className='fixed inset-0 z-50 bg-gray-100 flex justify-center items-center min-h-screen'>
        <div className="loader"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='fixed inset-0 z-50 bg-gray-100 flex justify-center items-center min-h-screen'>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-4">Sorry, the product you are looking for does not exist.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-primary_orange text-white py-2 px-4 rounded-[30px] transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Convert price to number if it's not already
  const price = Number(product.price);

  return (
    <>
      <Head>
        <title>Stuckbuld Catalogue | {product.name}</title>
        <meta name="description" content={product.description} />
        <meta name="og:title" content={`Stuckbuld Catalogue | ${product.name}`} />
        <meta name="og:description" content={product.description} />
        <meta name="og:image" content={product.imageUrl} />
      </Head>
      <div className="max-w-2xl w-full mx-auto px-4 py-8 border shadow-md my-8">
        <div className="flex flex-col items-center">
          <div className="w-[300px] h-[300px]">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-contain h-full rounded-lg mb-6"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-2">{product.category}</p>
            <p className="text-primary_brown font-semibold text-xl mb-4">${price.toFixed(2)}</p>
            <p className="text-gray-700 text-base mb-6 text-justify">{product.description}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="border-primary_orange border text-primary_orange py-2 px-12 rounded-[30px] transition"
              >
                Go Back
              </button>
              <button
                onClick={() => alert('Add to Cart functionality not implemented')}
                className="bg-primary_orange text-white py-2 px-12 rounded-[30px] transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
