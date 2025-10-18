import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import type { UserResponse } from "../../api/user/user.responses"

export function UserEdit() {
  const [user, setUser] = useState<UserResponse | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const currentUser = location.state?.user as UserResponse
    if (!currentUser) navigate(-1)

    setUser(currentUser)
  }, [])

  if (!user) return <div>No user in navigation state</div>

  return (
    <div>
      Edit user: {user.name} ({user.email})
    </div>
  )
}
