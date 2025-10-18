import { useEffect, useState } from "react"
import type { UserResponse } from "../../api/user/user.responses"
import { getAllUsers } from "../../api/user/user.api"
import { CustomTable } from "../../components/table/CustomTable"
import { useNavigate } from "react-router-dom"

export function UserList() {
  const [users, setUsers] = useState<UserResponse[]>([])
  const navigate = useNavigate()
  const tableHeaders = ["Nome", "Email"]

  function onEdit(item: object) {
    const user = item as UserResponse
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
