import { FoodTable } from "../Food/FoodTable"
import { KriteriaTable } from "../Kriteria/KriteriaTable"
import { UserPage } from "../User/UserPage"


export const Dashboard = () => {
    return(
        <div className="d-flex flex-column gap-4 mx-4">
            <div className="row">
                <div className="col-12 col-xl-6 col-xxl-6 mb-4 mb-xl-0">
                <UserPage forPage={'homepage'} maxHeight={'45rem'} />
                </div>
                <div className="col-12 col-xl-6 col-xxl-6">
                <KriteriaTable />
                </div>
            </div>
            <FoodTable maxHeight={'45rem'} forPage={'homepage'} />
        </div>
    )
}