import { Transparent } from "../UIReu/Buton/Transparent";
import { CustomModal } from "../UIReu/Modal/Modal";
import { useNavigate, NavLink } from "react-router-dom";
import LogoutIcon from '../../assets/images/Icon-Lg.svg'
import { sides } from '../../Utils/dataObj'
import Logo from '../../assets/images/Logo.png'
import { useState } from "react";
import './Sidebar.css'

export const Sidebar = () => {
    const [modal, setModal] = useState(false)
    const navigate = useNavigate();
    const handleLogout = () => {
      navigate('')
    }
    return(
        <>
         <aside className='sidebar'>
            <figure className='figure d-flex'>
            <img src={Logo} width={'200'} alt='SPK' />
            </figure>

            {/* Container list navigasi */}
            <ul className='list-group gap-2 mt-3'>
            {sides?.map((item, index) => {
                return (
                <li key={index} className={`list-unstyled`}>
                    <NavLink to={item.link} className='text-decoration-none'>
                    {({ isActive }) => (
                        <div className={`${isActive && 'btn-primary text-white'} text-primary d-flex navBtn btn`}>
                        <img
                            src={
                            isActive
                                ? item.icon2
                                : item.icon
                            }
                            width={'24'}
                            alt={item.label}
                        />
                        {item.label}
                        </div>
                    )}
                    </NavLink>
                </li>
                )
            })}
            </ul>
            <btn onClick={() => setModal(true)} className='logoutBtn mt-3 text-primary d-flex btn'>
            <p>Logout</p>
            <img src={LogoutIcon} alt='Logout' />
            </btn>

            {/* Modal Logout */}
            {modal &&
            <Transparent
                disabled={true}
                className='min-vw-100'
            >
                <CustomModal
                icon={logout}
                title={'Keluar?'}
                content={'Ingin beristirahat sejenak? keluar dan nikmati waktu Anda.'}
                confirmAction={handleLogout}
                cancelAction={() => setModal(false)}
                />
            </Transparent>
            }
        </aside>
        </>
    )
}