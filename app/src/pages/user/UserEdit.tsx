import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { canEditUser } from "../../api/user/user.api"
import type { UserResponse } from "../../api/user/user.responses"

export function UserEdit() {
  const [user, setUser] = useState<UserResponse>(null!)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const currentUser = location.state?.user as UserResponse
    const canEdit = canEditUser(currentUser)
    if (!currentUser || !canEdit) navigate(-1)
    setUser(currentUser)
  }, [])

  if (!user) return <div>No user in navigation state</div>

  return (
    <div>
      Edit user: {user.name} ({user.email})
    </div>
  )
}
