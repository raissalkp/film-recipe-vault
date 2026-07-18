import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './RecipeList.css'

const API = 'http://localhost:8000'

const SIM_COLOURS = {
  'Classic Chrome': '#6b7c93',
  'Velvia': '#c0392b',
  'Provia': '#27ae60',
  'Astia': '#8e44ad',
  'Eterna': '#2980b9',
}

export default function RecipeList() {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/recipes/`)
      .then(r => r.json())
      .then(data => { setRecipes(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.film_simulation.toLowerCase().includes(search.toLowerCase()) ||
    r.tags.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <p className="hint">Loading recipes...</p>

  return (
    <div>
      <input
        className="search"
        placeholder="Search by name, simulation, or tag..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {filtered.length === 0 && (
        <p className="hint">No recipes yet — <Link to="/add">add your first one</Link></p>
      )}
      <div className="grid">
        {filtered.map(recipe => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="card">
            <div className="card-accent" style={{ background: SIM_COLOURS[recipe.film_simulation] || '#444' }} />
            <div className="card-body">
              <h2 className="card-title">{recipe.name}</h2>
              <span className="sim-badge">{recipe.film_simulation}</span>
              <div className="tags">
                {recipe.tags.split(',').filter(Boolean).map(tag => (
                  <span key={tag} className="tag">{tag.trim()}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
