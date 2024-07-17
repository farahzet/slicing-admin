import { Rowtable } from "../../components/UIReu/Table/Rowtable"
import { TableContainer } from "../../components/UIReu/Table/TableContainer"
import { theadCPI } from "../../Utils/dataObj"


export const CPIResult = () => {
    return(
        <TableContainer
        title={"Perhitungan Hasil CPI"}
        thead={theadCPI}
        className={'border'}
        >
            <Rowtable
            ifEmpty={"Tidak ada data Perhitungan!"}
            totalRow={4}
            totalCol={8}
            renderItem={(data, index, offset) =>{
                return(
                    <tr
                    className="text-nowrap cursor-pointer"
                    key={data?.id}
                    >
                    {/* <td>{data?.id}</td> */}
                    <td>{data?.food_name}</td>
                    <td>{data?.calculationCPI}</td>
                    <td>{data?.result}</td>
                    </tr>
                )
            }}
            />
        </TableContainer>
    )
}