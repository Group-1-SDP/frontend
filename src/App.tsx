import { useState } from 'react'
import Authenticator from './views/Authenticator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Authenticator/>
    </>
  )
}

export default App
