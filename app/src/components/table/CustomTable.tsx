import { Pencil, Trash2, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function CustomTable({
  data,
  dataHeader,
  headers: headersProp,
  emptyMessage = "Nenhum dado disponível",
  onEdit,
  onDelete,
}: {
  data: object[]
  dataHeader?: string[]
  headers?: string[]
  emptyMessage?: string
  onEdit?: (item: object) => void
  onDelete?: (item: object) => void
}) {
  const headers = headersProp || dataHeader || (data.length > 0 ? Object.keys(data[0]) : [])
  const hasActions = onEdit || onDelete

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead
                key={header}
                className="font-semibold"
              >
                {header}
              </TableHead>
            ))}
            {hasActions && <TableHead className="w-24 text-center font-semibold">Ações</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                {Object.values(item).map((value, i) => (
                  <TableCell key={i}>
                    {value !== null && value !== undefined ? String(value) : "-"}
                  </TableCell>
                ))}
                {hasActions && (
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(item)}
                          className="h-8 w-8 text-primary hover:text-primary"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(item)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={headers.length + (hasActions ? 1 : 0)}
                className="h-32 text-center"
              >
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <ClipboardList className="mb-2 h-10 w-10" />
                  <span>{emptyMessage}</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
