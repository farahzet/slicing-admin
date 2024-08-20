import { Route, Routes } from "react-router"
import { Login } from "../pages/Login/Login"
import { PrivateRoute } from "./PrivateRoute"
import { Dashboard } from "../pages/Dashboard/Dashboard"
import { Layout } from "../Layout"
import { User } from "../pages/User/User"
import { FoodPage } from "../pages/Food/FoodPage"
import { KriteriaPage } from "../pages/Kriteria/KriteriaPage"
import { PenilaianPage } from "../pages/Penilaian/PenilaianPage"

export const RoutesPage = () =>{
    return(
        <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path='/users' element={<User/>} />
                    <Route path='/food' element={<FoodPage />} />
                    <Route path='/criteria' element={<KriteriaPage />} />
                    <Route path='/score' element={<PenilaianPage />} />
                </Route>    
            </Route>
        </Routes>
        </>
    )
}