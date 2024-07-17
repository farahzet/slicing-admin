
export const TableContainer = ({
  handleInput,
  inputValue,
  name,
  title,
  children,
  placeHolder,
  maxHeight,
  className,
  thead,
  bgThead
}) => {
  return (
    <div className={`table-responsive rounded-4 p-4 ${className}`}>
      <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-4">
        <h6 className="fw-semibold fs-2 m-0">{title}</h6>
      </div>
      
      <div className="table-responsive table-wrapper" style={{ height:'fit-content', maxHeight: `calc(100vh - ${maxHeight})` }}>
        <table className="table table-borderless table-striped align-middle" >
          <thead className='sticky-top z-0 '>
            <tr>
              {thead?.map((item, index) => (
                <th
                  key={index}
                  className={`fw-semibold text-nowrap ${bgThead} ${item === 'Status' && 'text-center'}`}
                  scope="col">
                  {item}
                </th>
              ))
              }
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  )
}