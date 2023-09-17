import { useEffect, useRef, useState, type ChangeEvent, useMemo } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UserList } from './components/UserList'

function App () {
  const [datos, setDatos] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const originalUser = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColor = () => {
    setShowColors(!showColors)
  }
  const toggleCountry = () => {
    const sortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(sortingValue)
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

  const filterUser = useMemo(() => {
    console.log('filterUser')

    return filterCountry != null && filterCountry.length > 0
      ? datos.filter((user) => {
        return user.location.country.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase())
      })
      : datos
  }, [datos, filterCountry])

  const sortedUsers = useMemo(() => {
    console.log('sortedUsers')

    return sorting === SortBy.COUNTRY
      ? filterUser.toSorted((a, b) => { return a.location.country.localeCompare(b.location.country) }
      )
      : filterUser
  }, [filterUser, sorting])

  const handleDelete = (email: string) => {
    const filterUser = datos.filter((user) => user.email !== email)
    setDatos(filterUser)
  }
  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setFilterCountry(inputValue)
  }

  const handleSort = (sort: SortBy) => {
    setSorting(sort)
  }

  return (
    <>
      <h1>Prueba técnica</h1>
      <header style={{ marginBottom: 48 }}>
        <button onClick={toggleColor}>Cambiar Color</button>
        <button onClick={toggleCountry}>
          {sorting === SortBy.COUNTRY ? 'Orden por defecto' : 'Sort By Country'}
        </button>
        <button onClick={handleReset}>Reset State</button>
        <input
          type="text"
          placeholder="Filter Country"
          onChange={e => {
            handleFilter(e)
          }}
        />
      </header>
      <main>
        <UserList
          handleSort={handleSort}
          deleteUser={handleDelete}
          showColor={showColors}
          users={sortedUsers}
        />
      </main>
    </>
  )
}

export default App
