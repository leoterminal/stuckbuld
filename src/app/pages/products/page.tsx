"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ModalProductForm from "../../../components/Modals/ModalProductForm";
import ProductCard from "../../../components/ProductCard";
import ProductFilter from "../../../components/ProductFilter";
import { Product } from "../../../utils/types";

const PRODUCTS_PER_PAGE = 10;

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    category: "Electronics",
    price: 0,
    imageUrl: "",
    description: "",
  });
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Added loading state
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
      setLoading(false); 
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredCategory(e.target.value);
    setCurrentPage(1); 
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(parseFloat(e.target.value));
    setCurrentPage(1); 
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = () => {
    const storedProducts = localStorage.getItem("products");
    const productList = storedProducts ? JSON.parse(storedProducts) : [];
    const newProductWithId = { ...newProduct, id: uuidv4() };
    localStorage.setItem(
      "products",
      JSON.stringify([...productList, newProductWithId])
    );
    setProducts([...productList, newProductWithId]);
    setShowForm(false);
    setNewProduct({
      name: "",
      category: "Electronics",
      price: 0,
      imageUrl: "",
      description: "",
    });
  };

  const handleUpdateProduct = () => {
    const storedProducts = localStorage.getItem("products");
    const productList = storedProducts ? JSON.parse(storedProducts) : [];
    const updatedProducts = productList.map((p: Product) =>
      p.id === editProduct?.id ? { ...editProduct, ...newProduct } : p
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setEditProduct(null);
    setShowForm(false);
    setNewProduct({
      name: "",
      category: "Electronics",
      price: 0,
      imageUrl: "",
      description: "",
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setShowForm(true);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      imageUrl: product.imageUrl,
      description: product.description,
    });
  };

  const handleDeleteProduct = (id: string) => {
    const storedProducts = localStorage.getItem("products");
    const productList = storedProducts ? JSON.parse(storedProducts) : [];
    const updatedProducts = productList.filter((p: Product) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (filteredCategory === "All" || product.category === filteredCategory) &&
      (maxPrice === 0 || product.price <= maxPrice)
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <div className="max-w-[95vw] sm:max-w-[754px] xl:max-w-[1240px] w-full mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <button
        onClick={() => {
          setShowForm(true);
          setEditProduct(null);
        }}
        className="bg-primary_orange text-white py-2 px-4 mb-4 hover:scale-105 rounded-[99px] transition"
      >
        Add Product
      </button>

      <ModalProductForm
        product={newProduct}
        onChange={handleFormChange}
        onSubmit={editProduct ? handleUpdateProduct : handleAddProduct}
        onCancel={() => setShowForm(false)}
        isEdit={!!editProduct}
        isOpen={showForm}
        onRequestClose={() => setShowForm(false)}
      />

      <ProductFilter
        category={filteredCategory}
        maxPrice={maxPrice}
        onCategoryChange={handleCategoryChange}
        onPriceChange={handlePriceChange}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      ) : paginatedProducts.length === 0 ? (
        <p className="text-center text-gray-600">No products added yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 py-6 bg-white mx-auto ">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded mx-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <span className="flex items-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded mx-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
