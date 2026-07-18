import {Routes, Route, Link } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import RecipeDetail from './components/RecipeDetail'
import RecipeForm from './components/RecipeForm'
import './App.css'

export default function App(){
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">🎞 Film Recipe Vault</Link>
        <Link to="/add" className="add-btn">+ Add Recipe</Link>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/add" element={<RecipeForm />} />
        </Routes>
      </main>
    </div>
  )
}
