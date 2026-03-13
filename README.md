# CineStream – Next.js Movie Explorer (SSR Edition)

## Overview

CineStream is a movie discovery web application rebuilt using **Next.js 15** to demonstrate modern frontend architecture with **Server-Side Rendering (SSR)**, **Server Components**, **Client Components**, and **SEO optimization**.

The application fetches movie data from the **OMDb API** and renders the content on the server before sending it to the browser. This improves performance, reduces unnecessary client-side JavaScript, and makes the application more accessible to search engines.

This project is an upgraded version of a previous React (Vite) implementation and focuses on showcasing the advantages of **Next.js App Router architecture**.

---

## Key Features

* Movie browsing interface with poster, title, and release year
* Server-side data fetching using Next.js Server Components
* Dynamic routing for movie detail pages
* SEO-friendly metadata generation for each movie
* Separation of Server and Client components
* Environment variable handling for API security
* Clean and modular project architecture

---

## Tech Stack

* Next.js 15 (App Router)
* React
* JavaScript (ES6+)
* Tailwind CSS
* OMDb API
* Server-Side Rendering (SSR)

---

## Project Architecture

```
cine-stream-next
│
├── app
│   ├── page.js
│   ├── layout.js
│   └── movie
│       └── [id]
│           └── page.js
│
├── components
│   ├── MovieCard.jsx
│   └── SearchBar.jsx
│
├── lib
│   └── api.js
│
├── public
│
├── .env.example
├── package.json
└── README.md
```

---

## How It Works

### Server Components

The main movie list is fetched directly within a **Server Component** using Next.js server-side rendering. This ensures the HTML is generated on the server before being delivered to the browser, improving performance and SEO.

### Client Components

Interactive features such as user inputs and UI interactions are implemented using **Client Components** marked with the `"use client"` directive. This allows the use of React hooks such as `useState`.

### Dynamic Routing

Next.js file-based routing is used to create dynamic movie pages.

Example route:

```
/movie/tt0133093
```

The movie ID is extracted from the URL and used to fetch detailed information about the selected movie.

### SEO Optimization

The application uses the `generateMetadata` function provided by Next.js to dynamically generate page metadata.

Example:

* Dynamic `<title>` tag
* Dynamic `<meta name="description">`

This ensures that each movie page has unique SEO metadata.

---

## Installation

Clone the repository:

```
git clone https://github.com/abhay-chayal/cine-stream-next.git
```

Navigate to the project folder:

```
cd cine-stream-next
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open the application in your browser:

```
http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file in the root directory and add your OMDb API key:

```
NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
```

Restart the development server after adding environment variables.

---

## API Integration

This project uses the **OMDb API** to retrieve movie data.

Example API request:

```
https://www.omdbapi.com/?apikey=YOUR_API_KEY&s=batman
```

Example movie details request:

```
https://www.omdbapi.com/?apikey=YOUR_API_KEY&i=tt0133093
```

---

## Future Improvements

* Implement advanced search and filtering
* Add infinite scrolling for large movie datasets
* Integrate a favorites feature using LocalStorage
* Add movie ratings and additional metadata
* Improve UI animations and transitions

---

## License

This project is created for educational and portfolio purposes and demonstrates modern frontend development practices using Next.js.
