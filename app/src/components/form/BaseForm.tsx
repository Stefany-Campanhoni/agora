import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BaseFormProps {
  title: string
  children: ReactNode
  onSubmit: (e: React.FormEvent) => void
  submitText: string
  isLoading?: boolean
  showBackButton?: boolean
  footerContent?: ReactNode
}

export function BaseForm({
  title,
  children,
  onSubmit,
  submitText,
  isLoading = false,
  showBackButton = true,
  footerContent,
}: BaseFormProps) {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleGoBack}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
            )}
            <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={onSubmit}
            className="space-y-4"
          >
            {children}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Carregando...
                </>
              ) : (
                submitText
              )}
            </Button>
          </form>
          {footerContent}
        </CardContent>
      </Card>
    </div>
  )
}
