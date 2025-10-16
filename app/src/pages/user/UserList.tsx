import { useEffect, useState } from "react"
import type { UserResponse } from "../../api/user/user.responses"
import { getAllUsers } from "../../api/user/user.api"
import { CustomTable } from "../../components/table/CustomTable"

export function UserList() {
  const [users, setUsers] = useState<UserResponse[]>([])
  const tableHeaders = ["Nome", "Email"]

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
    />
  )
}
