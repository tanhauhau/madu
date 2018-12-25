# Madu

Writing `jsx` as if `html` string

## Demo

```jsx
const Madu = require('@madu/madu');

function MovieList({ movies }) {
  return (
    <ul>
      {movies.map(movie => (
        <li>
          {movie.title}
          <span className="director">{movie.director}</span>
        </li>
      ))}
    </ul>
  );
}
async function App({ searchParam }) {
  const movies = await fetchMovies(searchParam);
  return <MovieList movies={movies} />;
}

const app = require('express')();
app.get('/movies/search', async function(req, res) {
  res.send(await <App searchParam={req.query.search} />);
  // sends out
  // <ul>
  //   <li>
  //     Avengers<span class="director">Anthony Russo</span>
  //   </li>
  //   <li>
  //     A star is born<span class="director">Bradley Cooper</span>
  //   </li>
  //   ...
  // </ul>
});
```

babelrc.js

```js
{
  plugins: ['@madu/babel-transform-madu'],
}
```
