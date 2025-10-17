import { FaEdit, FaTrash } from "react-icons/fa"
import "./CustomTable.css"

export function CustomTable({
  data,
  dataHeader,
  emptyMessage = "Nenhum dado disponível",
  onEdit,
  onDelete,
}: {
  data: object[]
  dataHeader?: string[]
  emptyMessage?: string
  onEdit?: (item: object) => void
  onDelete?: (item: object) => void
}) {
  const headers = dataHeader || (data.length > 0 ? Object.keys(data[0]) : [])
  const hasActions = onEdit || onDelete

  return (
    <div className="custom-table-container">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
            {hasActions && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, i) => (
                  <td key={i}>{value !== null && value !== undefined ? String(value) : "-"}</td>
                ))}
                {hasActions && (
                  <td className="action-cell">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="action-button edit-button"
                      >
                        <FaEdit />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item)}
                        className="action-button delete-button"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + (hasActions ? 1 : 0)}>
                <div className="custom-table-empty-icon">📋</div>
                <div>{emptyMessage}</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
