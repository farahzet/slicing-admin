import { theadAllPenilaian } from "../../Utils/dataObj";
import { Rowtable } from "../../components/UIReu/Table/Rowtable"
import { TableContainer } from "../../components/UIReu/Table/TableContainer"
import { CPIResult } from "./CPIResult";
import { BobotKriteria } from "./BobotKriteria";
import { FoodScore } from "./FoodScore";

const exampleData = [
    {
        id: 1,
        name: 'Nasi Goreng',
        carbo: 45,
        protein: 15,
        lemak: 10,
        
    },
    {
        id: 2,
        name: 'Ayam Bakar',
        carbo: 0,
        protein: 35,
        lemak: 20,
    },
    {
        id: 3,
        name: 'Gado-Gado',
        carbo: 30,
        protein: 10,
        lemak: 15,
    },
    {
        id: 4,
        name: 'Sate Kambing',
        carbo: 5,
        protein: 25,
        lemak: 30,
    },
    {
        id: 5,
        name: 'Soto Ayam',
        carbo: 20,
        protein: 18,
        lemak: 12,
    }
];
export const PenilaianPage = () => {
    return(
        // <TableContainer
        //     title={"Penilaian Makanan"}
        //     thead={theadAllPenilaian}
        //     className={'border'}
        // >    
        //     <Rowtable
        //     data={exampleData}
        //     ifEmpty={"Tidak ada data Penilaian!"}
        //     totalRow={5}
        //     totalCol={10}
        //     renderItem={(data, index, offset) => {
        //         return (
        //         <tr
        //             onClick={() => handleModal(data, offset)}
        //             data-bs-toggle="modal" data-bs-target="#medicineModal"
        //             className="text-nowrap cursor-pointer"
        //             key={index}
        //         >
        //             <td>{data?.id}</td>
        //             <td>{data?.name}</td>
        //             <td>{data?.carbo}</td>
        //             <td>{data?.protein}</td>
        //             <td>{data?.lemak}</td>
        //         </tr>
        //         );
        //     }}
        //     />
        // </TableContainer>

        <div className="d-flex flex-column gap-4 mx-4 mt-5">
            <FoodScore maxHeight={'45rem'}/>
            <BobotKriteria maxHeight={'45rem'}/>
            <CPIResult maxHeight={'45rem'}/>
        </div>
    )
}