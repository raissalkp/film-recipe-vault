import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './RecipeForm.css'

const API = 'http://localhost:8000'

const SIMULATIONS = ['Classic Chrome', 'Velvia', 'Provia', 'Astia', 'Eterna', 'Acros', 'Monochrome']

export default function RecipeEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState(null)

    useEffect(() => {
        fetch(`${API}/recipes/${id}`)
        .then(r => r.json())
        .then(setForm)
    }, [id])

    const set = (k, v) => setForm(f => ({... f, [k]: v}))

    const handleSubmit = async () => {
        const body = {... form,
            highlight_tone: Number(form.highlight_tone),
            shadow_tone: Number(form.shadow_tone),
            colour: Number(form.colour),
            sharpness: Number(form.sharpness),
            noise_reduction: Number(form.noise_reduction),
            wb_shift_red: Number(form.wb_shift_red),
            wb_shift_blue: Number(form.wb_shift_blue),
        }
        const res = await fetch(`${API}/recipes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (res.ok) navigate('/')
    }

    if (!form) return <p className="hint">Loading...</p>

    return (
        <div className="form-wrap">
            <h1 className="form-title">Edit Recipe</h1>

            <label>Name
                <input value={form.name} onChange={e => set('name', e.target.value)} />
            </label>
            <label>Film Simulation
                <select value={form.film_simulation} onChange={e => set('film_simulation', e.target.value)}>
                    {SIMULATIONS.map(s => <option key={s}>{s}</option>)}
                </select>   
            </label>
            <label>Dynamic Range
                <select value={form.dynamic_range} onChange={e => set('dynamic_range', e.target.value)}>
                    {['DR100','DR200','DR400'].map(d => <option key={d}>{d}</option>)}
                </select>
            </label>
            {[
                ['Highlight Tone', 'highlight_tone'],
                ['Shadow Tone', 'shadow_tone'],
                ['Colour', 'colour'],
                ['Sharpness', 'sharpness'],
                ['Noise Reduction', 'noise_reduction'],
                ['WB Shift Red', 'wb_shift_red'],
                ['WB Shift Blue', 'wb_shift_blue'],
            ].map(([label, key]) => (
                <label key={key}>{label}
                    <div className="slider-row">
                        <input type="range" min="-4" max="4" value={form[key]}
                            onChange={e => set(key, e.target.value)} />
                        <span className="slider-val">{form[key] > 0 ? `+${form[key]}` : form[key]}</span>
                    </div>
                </label>
            ))}
            <label>White Balance
            <input value={form.white_balance} onChange={e => set('white_balance', e.target.value)} placeholder="Auto" />
            </label>

            <label>Tags (comma separated)
            <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="travel,japan,street" />
            </label>

            <label>Notes
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Any notes about this recipe..." />
            </label>

            <button className="submit-btn" onClick={handleSubmit}>Save Recipe</button>
        </div>
    )

}
