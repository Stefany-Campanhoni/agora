import { User } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { ModalAuthContent } from "./ModalAuthContent"
import { ModalManagementContent } from "./ModalManagementContent"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type UserModalProps = {
  onHide: () => void
  show: boolean
}

export function UserModal(props: UserModalProps) {
  const { isAuthenticated } = useAuth()

  return (
    <Dialog
      open={props.show}
      onOpenChange={(open) => !open && props.onHide()}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <User className="h-5 w-5 text-primary" />
            Acesso do Usuário
          </DialogTitle>
        </DialogHeader>

        {!isAuthenticated ? <ModalAuthContent onHide={props.onHide} /> : <ModalManagementContent />}
      </DialogContent>
    </Dialog>
  )
}
