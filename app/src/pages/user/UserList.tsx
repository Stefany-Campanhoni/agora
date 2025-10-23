import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CustomTable } from "../../components/table/CustomTable"
import { getAllUsers } from "../../service/user/user.api"
import type { User } from "../../service/user/user.types"

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
