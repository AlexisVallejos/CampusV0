"use client"

import { useState } from "react"

const Login = () => {
  const [legajo, setLegajo] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Legajo:", legajo)
    console.log("Contraseña:", password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">
            Legajo
          </label>
          <input
            type="text"
            value={legajo}
            onChange={(e) => setLegajo(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-colors"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

export default Login
