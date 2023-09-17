import { SortBy, type User } from '../types.d'

interface Props {
  users: User[] | undefined
  showColor: boolean
  deleteUser: (email: string) => void
  changeShorting: (sort: SortBy) => void
}

export const UserList = ({ users, showColor, deleteUser, changeShorting }: Props) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>FOTO</th>
          <th
            style={{ cursor: 'pointer' }}
            onClick={() => {
              changeShorting(SortBy.NAME)
            }}
          >
            NOMBRE
          </th>
          <th
            style={{ cursor: 'pointer' }}
            onClick={() => {
              changeShorting(SortBy.LAST)
            }}
          >
            APELLIDO
          </th>
          <th
            style={{ cursor: 'pointer' }}
            onClick={() => {
              changeShorting(SortBy.COUNTRY)
            }}
          >
            PAIS
          </th>
          <th>ACCION</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, index) => {
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
                <button
                  onClick={() => {
                    deleteUser(user.email)
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
