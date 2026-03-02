import { useState } from 'react'

function App(){  // ← add return type
  const [count, setCount] = useState<number>(0)  // ← add generic type

  return (
    <div className="min-h-screen bg-green-200 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-green-700">
        Tailwind Working 🚀
      </h1>
    </div>
  )
}

export default App