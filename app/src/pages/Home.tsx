import { useEffect } from "react"
import { LogOut, LogIn } from "lucide-react"

import { useAuth } from "@/hooks/useAuth"
import { loadUser } from "@/service/user/user.api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Home() {
  const { isAuthenticated, token, logout } = useAuth()

  useEffect(() => {
    if (!token) return
    ;(async () => {
      await loadUser()
    })()
  }, [])

  if (isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Bem-vindo!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-muted-foreground">Você está autenticado com o token:</p>
            <div className="bg-muted rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-foreground break-all">{token}</code>
            </div>
            <div className="flex justify-center">
              <Button
                variant="destructive"
                onClick={() => logout()}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <CardTitle className="text-xl font-medium text-foreground">
            Faça login para continuar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <a href="/login">
              <LogIn className="h-4 w-4 mr-2" />
              Entrar
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
