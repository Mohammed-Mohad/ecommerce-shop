# Ecommerce Shop

A modern ecommerce front‑end built with Next.js 16 (App Router) and TypeScript. The app consumes the DummyJSON API to showcase a real-world shopping experience including product discovery, CRUD workflows, and stateful features such as favorites, cart, and dark-mode-ready design.

## Features

- **Product discovery**: Infinite-scroll grid with category filters and keyword search (DummyJSON `/products`, `/products/search`, `/products/category/:slug`).
- **Product details**: Rich layout with gallery, rating, stock info, and quick actions (add to cart, favorite, edit/delete for CRUD demo).
- **Favorites**: Redux Toolkit slice with localStorage persistence and dedicated `/favorites` page.
- **Cart**: Slide-out cart sheet with quantity controls, Redux state, persistence, and toast feedback.
- **CRUD flows**: Create/edit product forms powered by `react-hook-form` + `zod`; delete confirmation via Shadcn alert dialog. (DummyJSON mutations are mocked by the API).
- **UI/UX polish**: Shadcn components, Tailwind CSS v4, Sonner toasts, responsive layout, and loading/error handling hooks.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with the App Router (`src/app`)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Shadcn UI components
- **State**: Redux Toolkit + React Redux (cart, favorites, theme)
- **Forms & Validation**: `react-hook-form`, `zod`, `@hookform/resolvers`
- **HTTP Client**: Axios (DummyJSON API)
- **Icons**: Lucide React
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 20+ (matching the `next` requirement)
- npm 10+ (bundled with Node 20)

### Installation

```bash
git clone https://github.com/Mohammed-Mohad/ecommerce-shop.git
cd ecommerce-shop
npm install
```

### Development

- **Run dev server**: `npm run dev` (defaults to <http://localhost:3000>)
- **Lint**: `npm run lint`
- **Production build**: `npm run build` then `npm run start`

### Environment

No additional environment variables are required. All data comes from [DummyJSON Products API](https://dummyjson.com/docs/products).

## Project Structure

```
src/
├── app/               # App Router routes
│   ├── page.tsx       # Product listing w/ search & infinite scroll
│   ├── favorites/     # Saved products page
│   ├── products/new   # Create form
│   └── product/[id]   # Detail + edit routes
├── components/        # Shared UI (Navbar, ProductCard, forms, etc.)
├── lib/               # API client & helpers
├── store/             # Redux slices (cart, favorites)
└── types/             # Shared TypeScript types
```

## Notes & Limitations

- DummyJSON's mutation endpoints return mocked responses and do **not** persist data server-side. Newly created products only exist for the redirect response and are not queryable afterwards.
- Authentication/authorization is not implemented; CRUD pages are publicly accessible for demo purposes.

## Future Enhancements

- Redux-powered dark mode toggle (globals already theme-ready)
- Auth gate for CRUD pages
- Additional loading skeletons and error boundaries for API calls
- CI checks and automated tests

## License

This project is for portfolio/demo purposes and follows the DummyJSON usage guidelines. Feel free to fork and extend. Contributions via PRs are welcome!
