import { Button } from "../UIReu/Buton/Button";
import { Users } from "../Users/Users";
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css'
import { navTitle } from "../../Utils/dataObj";
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
    // Buat render title dan content secara dinamis berdasarkan rute
    const location = useLocation();
    const currentRoute = location.pathname.split("/")[1];
    const currentNav = navTitle.find((item) => item.route === currentRoute
        );
        const [modalNotif, setModalNotif] = useState(false);

        return (
        <header className={styles.navbar}>
            <nav className="d-flex w-100 justify-content-between align-items-center py-4 py-md-0">
            <div>
                <h5 className="fw-semibold m-0">
                {currentNav ? currentNav.title : null}
                </h5>
            </div>
            <div className="d-flex gap-2 align-items-center">
                <div className="d-flex align-items-center pe-3 pe-md-0 gap-3">
                <div className=" d-none d-lg-block">
                    <UserProfile />
                </div>
                </div>
            </div>
        </nav>
    </header>
    );
};

const UserProfile = () => {
    // const {
    // data,
    // isPending,
    // isError,
    // refetch
    // } = ()
    
    // if (isError) {
    // return(
    //     // <ErrorStatus action={refetch} title={'Gagal memuat profile'} />
    //     <h2>Error</h2>
    // )
    // }

    // return (
    //     data?(
    //         <Users
    //         name={data?.results.name}
    //         role={'User'}
    //     />
    //     ) : null
    // )

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setUserData({
                avatar: 'assets\images\IconProfile.svg', 
                name: 'Farah Nisa',
                role: 'Admin'
            });
            setLoading(false);
        }, 2000); 
    }, []);

    return (
        <figure className="m-0 d-inline-flex gap-2 align-items-center">
        {loading ? (
            // Menampilkan teks loading atau null sementara data dimuat
            <p>Loading...</p>
        ) : (
            <>
            <img src={userData.avatar} alt='Avatar' width={48} height={48} />
            <div>
                <p className="m-0 fs-3">{userData.name}</p>
                <p className="m-0">{userData.role}</p>
            </div>
            </>
        )}
        </figure>
    );
}