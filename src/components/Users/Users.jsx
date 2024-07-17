import ava from '../../assets/images/ava.svg'

export const Users = ({ name, role }) => {
    return(
    <>
        <figure className="m-0 d-inline-flex gap-2 align-items-center">
        <img src={ava} alt='Avatar' />
        <div>
            <p className="m-0 fs-2">{name}</p>
            <p className="m-0">{role}</p>
        </div>
        </figure>
    </>
    )
}