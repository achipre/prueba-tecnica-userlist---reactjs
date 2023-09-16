import { useEffect, useRef, useState } from 'react'
import './App.css'
import { type User } from './types'
import { UserList } from './components/UserList'

function App () {
  const [datos, setDatos] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const originalUser = useRef<User[]>([])

  const toggleColor = () => {
    setShowColors(!showColors)
  }
  const toggleCountry = () => {
    setSortByCountry(prevState => !prevState)
  }
  const handleReset = () => {
    setDatos(originalUser.current)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async resp => await resp.json())
      .then(datos => {
        setDatos(datos.results)
        originalUser.current = datos.results
      })
      .catch(err => { console.log(err) }
      )
  }, [])

  const sortedUsers = sortByCountry
    ? datos.toSorted((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : datos

  const handleDelete = (email: string) => {
    const filterUser = datos.filter((user) => user.email !== email)
    setDatos(filterUser)
  }

  return (
    <>
      <h1>Prueba técnica</h1>
      <header style={{ marginBottom: 48 }}>
        <button onClick={toggleColor}>Cambiar Color</button>
        <button onClick={toggleCountry}>
          {sortByCountry ? 'Orden por defecto' : 'Sort By Country'}
        </button>
        <button onClick={handleReset}>
          Reset State
        </button>
      </header>
      <main>
        <UserList deleteUser={handleDelete} showColor={showColors} users={sortedUsers} />
      </main>
    </>
  )
}

export default App
