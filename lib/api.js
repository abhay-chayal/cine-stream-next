"use server"

const API_KEY = process.env.OMDB_API_KEY

export async function getMovies(search = 'Avengers', page = 1) {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(search)}&page=${page}`,
      { cache: 'no-store' }
    )
    const data = await res.json()
    return {
      movies: data.Search || [],
      totalResults: parseInt(data.totalResults) || 0
    }
  } catch {
    return { movies: [], totalResults: 0 }
  }
}

export async function getMovie(id) {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`,
      { cache: 'no-store' }
    )
    return res.json()
  } catch {
    return null
  }
}
