import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllUsers } from "../../api/user/user.api"
import type { User } from "../../api/user/user.types"
import { CustomTable } from "../../components/table/CustomTable"

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const navigate = useNavigate()
  const tableHeaders = ["Nome", "Email"]

  function onEdit(item: object) {
    const user = item as User
    navigate("../../user/edit", { state: { user } })
  }

  useEffect(() => {
    ;(async () => {
      const usersResponse = await getAllUsers()
      setUsers(usersResponse.users)
    })()
  }, [])

  return (
    <CustomTable
      data={users}
      dataHeader={tableHeaders}
      onEdit={onEdit}
    />
  )
}
