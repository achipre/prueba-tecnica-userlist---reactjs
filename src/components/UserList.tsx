import { type User } from '../types'

interface Props {
  users: User[]
  showColor: boolean
  deleteUser: (email: string) => void
}

export const UserList = ({ users, showColor, deleteUser }: Props) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>FOTO</th>
          <th>NOMBRE</th>
          <th>APELLIDO</th>
          <th>PAIS</th>
          <th>ACCION</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const backGround = index % 2 === 0 ? 'red' : 'blue'
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
