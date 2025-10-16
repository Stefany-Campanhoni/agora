import "./CustomTable.css"

export function CustomTable({
  data,
  dataHeader,
  emptyMessage = "Nenhum dado disponível",
}: {
  data: object[]
  dataHeader?: string[]
  emptyMessage?: string
}) {
  const headers = dataHeader || (data.length > 0 ? Object.keys(data[0]) : [])

  return (
    <div className="custom-table-container">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, i) => (
                  <td key={i}>
                    {value !== null && value !== undefined
                      ? String(value)
                      : "-"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length}>
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
