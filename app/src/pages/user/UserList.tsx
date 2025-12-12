import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"

import { CustomTable } from "@/components/table/CustomTable"
import { getAllUsers } from "@/service/user/user.api"
import type { User } from "@/service/user/user.types"

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const tableHeaders = ["Nome", "Email"]

  function onEdit(item: object) {
    const user = item as User
    navigate("../../user/edit", { state: { user } })
  }

  useEffect(() => {
    ;(async () => {
      try {
        const usersResponse = await getAllUsers()
        setUsers(usersResponse.users)
      } catch (error) {
        console.error("Erro ao carregar usuários:", error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const tableData = users.map((user) => ({
    ...user,
    cells: [user.name, user.email],
  }))

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-foreground mb-6">Gerenciamento de Usuários</h1>

      {users.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum usuário encontrado.</p>
        </div>
      ) : (
        <CustomTable
          headers={tableHeaders}
          data={tableData}
          onEdit={onEdit}
        />
      )}
    </div>
  )
}
