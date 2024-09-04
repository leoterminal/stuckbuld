# E-commerce Product Listing Platform

## Overview

This project is a Product Listing Platform built using the latest versions of Next.js, TypeScript, and Tailwind CSS. The platform includes features for listing products, viewing individual product details, and filtering products by category or price. Additionally, users can add, edit, and delete products. For data storage, local storage is used to simplify the project setup. The platform is designed to be SEO-compliant, performant, and follows clean coding practices.

## Features

- **Product Listing**: Displays a list of products with basic details.
- **Product Details**: View detailed information about a specific product.
- **Filtering**: Filter products by category or price.
- **CRUD Operations**: Add, edit, and delete products.
- **SEO Compliance**: Includes SEO best practices for improved search engine visibility.

## Tech Stack

- **Next.js**: For server-side rendering and static site generation.
- **TypeScript**: For type safety and better development experience.
- **Tailwind CSS**: For utility-first styling.
- **Local Storage**: Used for storing product data locally.

## Setup and Running the Project Locally

### Prerequisites

- Node.js (>= 16.x)
- npm or Yarn

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/leoterminal/stuckbuld.git

   

Navigate to the Project Directory

    ```bash cd stuckbuld

Install Dependencies

    ```npm install
        # or
        yarn install

Run the Development Server

```npm run dev
   # or
    yarn dev

The application will be available at http://localhost:3000.

## Building for Production
To build the application for production, run:

```
npm run build
# or
yarn build


 Then, start the production server with:

```
npm start
# or
yarn start


## Design Decisions.

 Local Storage: Products are stored in the browser's local storage to simplify data management and avoid the need for a remote database.
 SEO Optimization: Next.js is used for server-side rendering to enhance SEO. Meta tags, structured data, and proper HTML tags are included to ensure that search engines can crawl and index the content effectively.
 Tailwind CSS: Utilized for its utility-first approach, enabling rapid and responsive design without leaving the HTML.
 Optimizations and Trade-offs
 Performance: Next.js provides automatic code splitting and optimized performance out of the box. Tailwind CSS ensures that only the necessary styles are included in the final build.
 Local Storage Limitations: Using local storage limits data size and is not suitable for production-level applications with large datasets or multi-user support.