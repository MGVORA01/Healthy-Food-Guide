import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-green-200 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-green-700">
        Tailwind Working 🚀
      </h1>
    </div>
  )
}


export default App
