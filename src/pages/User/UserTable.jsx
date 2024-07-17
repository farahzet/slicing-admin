import { Link } from "react-router-dom"

export const UserTable = ({
    children,
    thead,
    pageFor,
    className,
    maxHeight
    }) => {
    return (
        <div className={`table-responsive rounded-4 p-4 ${className} mt-4`}>
        {pageFor === 'homepage' && (
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
            <h3 className="card-title text-nowrap fs-2 fw-semibold">Daftar User</h3>
            <Link to={'/users'} className=" text-decoration-none text-nowrap fw-semibold">Lihat Semua</Link>
            </div>
        )}

        <div
            className="table-responsive table-wrapper"
            style={{
            height: 'fit-content',
            minHeight: '13rem',
            maxHeight: `calc(100vh - ${maxHeight ?? '14rem'})`
            }}>
            <table className="table table-borderless table-striped align-middle" >
            <thead className='sticky-top z-0 '>
                <tr>
                {thead?.map((item, index) => (
                    <th
                    key={index}
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