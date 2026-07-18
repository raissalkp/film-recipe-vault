import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './RecipeDetail.css'

const API = 'http://localhost:8000'

const FIELDS = [
  ['Film Simulation', 'film_simulation'],
  ['Dynamic Range', 'dynamic_range'],
  ['Highlight Tone', 'highlight_tone'],
  ['Shadow Tone', 'shadow_tone'],
  ['Colour', 'colour'],
  ['Sharpness', 'sharpness'],
  ['Noise Reduction', 'noise_reduction'],
  ['White Balance', 'white_balance'],
  ['WB Shift Red', 'wb_shift_red'],
  ['WB Shift Blue', 'wb_shift_blue'],
]

export default function RecipeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    fetch(`${API}/recipes/${id}`)
      .then(r => r.json())
      .then(setRecipe)
  }, [id])

  const handleDelete = async () => {
    if (!confirm('Delete this recipe?')) return
    await fetch(`${API}/recipes/${id}`, { method: 'DELETE' })
    navigate('/')
  }

  if (!recipe) return <p className="hint">Loading...</p>

  return (
    <div className="detail">
      <button className="back" onClick={() => navigate('/')}>← Back</button>
      <h1 className="detail-title">{recipe.name}</h1>
      {recipe.notes && <p className="notes">{recipe.notes}</p>}
      <div className="settings">
        {FIELDS.map(([label, key]) => (
          <div key={key} className="setting-row">
            <span className="setting-label">{label}</span>
            <span className="setting-value">{recipe[key]}</span>
          </div>
        ))}
      </div>
      <div className="tags">
        {recipe.tags.split(',').filter(Boolean).map(tag => (
          <span key={tag} className="tag">{tag.trim()}</span>
        ))}
      </div>
      <button className="delete-btn" onClick={handleDelete}>Delete recipe</button>
    </div>
  )
}