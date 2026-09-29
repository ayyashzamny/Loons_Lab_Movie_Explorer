# Movie Explorer

This is a Movie Explorer application I built as part of the internship assignment.

The application uses the TMDb API to get movie information. Users can search for movies, view trending movies, check movie details, watch trailers and save their favorite movies.

## Features

* Login
* View trending movies
* Search for movies
* Infinite scrolling for search results
* Filter movies by genre, year and rating
* View movie details
* View cast, genres, rating, runtime and overview
* Watch available YouTube trailers inside the app
* Add movies to favorites
* Favorites are saved even after refreshing the page
* Last searched movie is remembered
* Light and dark mode
* Responsive design
* Basic error handling

## How to Run

Clone the repository and install the dependencies:

```bash
npm install
```

Create a `.env` file in the main project folder and add:

```env
VITE_TMDB_ACCESS_TOKEN=YOUR_TMDB_READ_ACCESS_TOKEN

VITE_APP_USERNAME=admin
VITE_APP_PASSWORD=MovieExplorer123
```

Then start the application:

```bash
npm run dev
```

The application will open using the local URL shown in the terminal.

## Login

Use the following demo credentials:

```text
Username: admin
Password: MovieExplorer123
```

## About the Application

When the application starts, it shows trending movies from TMDb.

Movies can be searched using the search bar. Search results are loaded as the user scrolls down.

If the search is submitted without entering anything, the application goes back to showing trending movies.

Movies can also be filtered by genre, release year and minimum rating.

Clicking on a movie opens a details window where you can see more information about the movie. If a YouTube trailer is available, it can be played directly inside the application.

Users can save movies using the heart button. These favorites are stored in the browser's localStorage.

The application also remembers the last movie search and the selected light/dark theme.

## Build

To create a production build:

```bash
npm run build
```

## Live Demo

[movie-explorer-eta-seven.vercel.app](https://movie-explorer-eta-seven.vercel.app/)

## Repository

[github.com/ayyashzamny/Loons_Lab_Movie_Explorer.git](https://github.com/ayyashzamny/Loons_Lab_Movie_Explorer.git)

## Author

Ayyash Zamny
