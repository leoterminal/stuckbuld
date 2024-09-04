'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { saveMockDataToLocalStorage } from '@/utils/Data/MockData';

// Define the product interface
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export default function Home() {
  // Use the Product type for state
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from local storage
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]') as Product[];
    setProducts(storedProducts.slice(0,3));
  }, []);

  useEffect(() => {
    saveMockDataToLocalStorage();
  }, []);

  

  return (
    <>
      <section className=" max-w-[95vw] sm:max-w-[754px] xl:max-w-[1240px] w-full text-left mx-auto bg-blue-50 py-20 rounded-2xl my-12 border  border-blue-800">
        <div className=" w-full flex flex-col justify-center items-center h-full">
          <h1 className="text-3xl font-extrabold text-gray-900 mx-auto text-center">
            Welcome to Stuckbuld Catalogue
          </h1>
          <p className="text-lg text-gray-500 mt-4 text-center">
            Discover, Shop, and Enjoy the Best Products Online
          </p>
          <Link href={'/pages/products'} className="mt-8 mx-auto block w-fit bg-primary_orange text-white py-3 px-6 rounded-[99px] hover:scale-105 transition">
            Start Shopping
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-pink-50">
        <div className="max-w-[95vw] sm:max-w-[754px] xl:max-w-[1240px] w-full mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-900">Why Choose Us?</h2>
          <div className="flex flex-wrap justify-center mt-12">
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-2xl font-bold text-primbg-primary_orange mb-4">Wide Range of Products</h3>
                <p className="text-gray-500">
                  We offer a diverse selection of products across various categories.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-2xl font-bold text-primbg-primary_orange mb-4">User-Friendly Interface</h3>
                <p className="text-gray-500">
                  Our platform is designed to be intuitive and easy to navigate.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-2xl font-bold text-primbg-primary_orange mb-4">SEO Optimized</h3>
                <p className="text-gray-500">
                  Our platform ensures your products get the visibility they deserve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="bg-white py-20">
        <div className="max-w-[95vw] sm:max-w-[754px] xl:max-w-[1240px] w-full mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-900">Our Top Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {products.length ? (
              products.map((product) => (
                <div key={product.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                   <Link href={`/pages/products/${product.id}`} className=" ">
           
                  <Image
                    src={product.imageUrl || "https://via.placeholder.com/150"}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="w-full h-48 object-contain rounded-md"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mt-4">{product.name}</h3>
                  <p className="text-gray-500 mt-2">${Number(product.price)}</p>
                </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No products available</p>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-pink-50 ">
        <div className="max-w-[95vw] sm:max-w-[754px] xl:max-w-[1240px] w-full mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-900">What Our Customers Say</h2>
          <div className="flex flex-wrap justify-center mt-12">
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <p className="text-gray-500 italic">Great platform! I found exactly what I was looking for.</p>
                <p className="text-primbg-primary_orange font-bold mt-4">- Jane Doe</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <p className="text-gray-500 italic">User-friendly and lots of options.</p>
                <p className="text-primbg-primary_orange font-bold mt-4">- John Smith</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <p className="text-gray-500 italic">Highly recommend this platform for online shopping!</p>
                <p className="text-primbg-primary_orange font-bold mt-4">- Alice Johnson</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary_orange py-20 text-white text-center">
        <div className="max-w-[95vw] sm:max-w-[754px] xl:max-w-[1240px] w-full mx-auto">
          <h2 className="text-4xl font-bold">Ready to Explore?</h2>
          <p className="text-lg mt-4">Find the best products at unbeatable prices.</p>
          <Link href={'/pages/products'} className="mt-8 block w-fit mx-auto text-white bg-slate-800 border border-slate-800 py-3 px-6 rounded-[30px] hover:scale-105 transition">
            Start Shopping Now
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 py-8 text-white">
        <div className="max-w-[95vw] sm:max-w-[754px] xl:max-w-[1240px] w-full mx-auto text-center">
          <p>© 2024 Stuckbuld Cataloque. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">Contact Us</a>
          </div>
        </div>
      </footer>
    </>
  );
}
