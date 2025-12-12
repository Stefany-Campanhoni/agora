import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"

export function ModalAuthContent(props: { onHide: () => void }) {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/user/login")
    props.onHide()
  }

  const handleRegister = () => {
    navigate("/user/register")
    props.onHide()
  }

  return (
    <>
      <div className="py-4">
        <p className="text-center text-muted-foreground">Escolha uma opção para continuar:</p>
      </div>
      <DialogFooter className="flex-col gap-2 sm:flex-row">
        <Button
          onClick={handleLogin}
          className="w-full sm:w-auto"
        >
          Fazer Login
        </Button>
        <Button
          variant="outline"
          onClick={handleRegister}
          className="w-full sm:w-auto"
        >
          Registrar-se
        </Button>
      </DialogFooter>
    </>
  )
}
