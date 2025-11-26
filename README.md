# Event in Ctg

A polished **Next.js (App Router)** application with **NextAuth.js** authentication, featuring public and protected pages. Users can view, add, and manage products in a responsive UI.

---

## Features

- **Landing Page**: Hero, 4+ sections, responsive navbar, footer  
- **Authentication**: Email/password & Google login via NextAuth.js  
- **Item List Page**: Search/filter, grid of cards with image, title, description, price, and details button  
- **Item Details Page**: Large banner, full description, meta info, back button  
- **Protected Pages**: 
  - Add Product – form with title, short & full description, price, date, optional image  
  - Manage Products – table/grid listing products with View/Delete actions  

---

## Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS, React  
- **Authentication**: NextAuth.js  
- **Backend**: Express.js  
- **Database**: MongoDB  

---

## Installation

```bash
# Clone repo
git clone <repo-url>
cd <project-folder>

# Install dependencies
npm install

# Start backend server
node server/index.js

# Start Next.js frontend
npm run dev
