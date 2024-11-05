
import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState('')
  const [count, setCount] = useState(8)
  const [isNumber, setIsNumber] = useState(false)
  const [isSpecialCharacter, setSpecialIsCharacter] = useState(false)
  const passRef = useRef(null)

  function genearatePassword(){
    let pass = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let numbers = '0123456789'
    let special = '!@#$%^&*()_+'

    if(isNumber) characters += numbers
    if(isSpecialCharacter) characters += special

    for(let i = 0; i < count; i++){
      pass += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    setPassword(pass)
  }

  useEffect(()=>{
    genearatePassword()
  }, [count, isNumber, isSpecialCharacter])
  
  function coppied_pass(){
    passRef.current.select()
    navigator.clipboard.writeText(password)
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Password Generator</h1>
      <div className="bg-gray-100">
        <div>
          <input type="text" value={password} readOnly ref={passRef}/>
          <button onClick={coppied_pass}>Copy</button>
        </div>
        <div>
          <input type="range" min={4} max={32} value={count} onChange={(e)=>setCount(e.target.value)}/>
          <span>{count}</span>
          <input type="checkbox" onClick={()=>setIsNumber((prev)=> !prev)}/>
          <span>Numbers</span>
          <input type="checkbox" onClick={()=>setSpecialIsCharacter((prev)=> !prev)}/>
          <span>Character</span>
        </div>
      </div>
    </>
  )
}

export default App
