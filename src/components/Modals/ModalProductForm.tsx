import React, { ChangeEvent, useState } from 'react';
import { Product } from '../../utils/types';
import { z } from 'zod';

// Define the Zod schema
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().nonempty("Category is required"),
  price: z.number().min(0, "Price must be a positive number"),
  imageUrl: z.string().url("Invalid image URL"),
  description: z.string().nonempty("Description is required"),
});

type ModalProductFormProps = {
  product: Omit<Product, 'id'>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit: boolean;
  isOpen: boolean;
  onRequestClose: () => void;
};

const ModalProductForm: React.FC<ModalProductFormProps> = ({
  product,
  onChange,
  onSubmit,
  onCancel,
  isEdit,
  isOpen,
  onRequestClose,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        // Update product image URL with base64 string
        onChange({
          target: { name: 'imageUrl', value: reader.result as string },
        } as ChangeEvent<HTMLInputElement>);
      };
      
      reader.readAsDataURL(file);
    }
  };

  // Update onChange handler to ensure price is a number
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Handle price conversion to number
    const newValue = name === 'price' && type === 'number' ? parseFloat(value) : value;
    onChange({ target: { name, value: newValue } } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
  };

  // Validate form data
  const validateForm = () => {
    try {
      productSchema.parse({
        ...product,
        imageUrl: imagePreview || product.imageUrl, 
      });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
      }
      return false;
    }
  };

  // Handle form submit
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
      setImagePreview(null); // Clear image preview after submit
      setErrors({});
    }
  };

  // Handle form cancel
  const handleCancel = () => {
    onCancel();
    setImagePreview(null); // Clear image preview after cancel
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 shadow-lg max-w-md mx-auto relative overflow-y-auto no-scrollbar rounded-xl lg:w-[400px] w-[327px] h-[80%]">
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            {/* Add more categories as needed */}
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="block mt-2 max-w-full mx-auto size-40"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white py-2 px-4 rounded-[30px] hover:bg-green-600 transition"
          >
            {isEdit ? 'Update Product' : 'Add Product'}
          </button>
          <button
            onClick={handleCancel}
            className="border-red-500 text-red-500 py-2 px-4 border rounded-[30px] transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalProductForm;
