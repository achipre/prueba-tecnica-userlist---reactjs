import { SortBy, type User } from '../types.d'

interface Props {
  users: User[]
  showColor: boolean
  deleteUser: (email: string) => void
  handleSort: (sort: SortBy) => void
}

export const UserList = ({ users, showColor, deleteUser, handleSort }: Props) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>FOTO</th>
          <th onClick={() => { handleSort(SortBy.NAME) }}>NOMBRE</th>
          <th onClick={() => { handleSort(SortBy.LAST) }}>APELLIDO</th>
          <th onClick={() => { handleSort(SortBy.COUNTRY) }}>PAIS</th>
          <th>ACCION</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const backGround = index % 2 === 0 ? '#2C394B' : '#334756'
          const color = showColor ? backGround : 'transparent'

          return (
            <tr style={{ backgroundColor: color }} key={user.login.uuid}>
              <td>
                <img src={user.picture.thumbnail} alt={user.name.first} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => { deleteUser(user.email) }}>Delete</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
