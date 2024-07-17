import { theadKriteria } from "../../Utils/dataObj";
import { Rowtable } from "../../components/UIReu/Table/Rowtable";
import { KriteriaContainer } from "./KriteriaContainer";


const exampleData = [
    {
        id: 1,
        code: 'F001',
        name: 'Karbohidrat',
        bobot: 45,
        tren: 15,
    },
    {
        id: 2,
        code: 'F002',
        name: 'Protein',
        bobot: 45,
        tren: 15,
    },
    {
        id: 3,
        code: 'F003',
        name: 'Lemak',
        bobot: 45,
        tren: 15,
    },
];

export const KriteriaTable = () => {
    return(
        <KriteriaContainer
            thead={theadKriteria}
            pageFor={'homepage'}
            className={'border'}
            maxHeight={'45rem'}
            >
            <Rowtable
            ifEmpty={"Tidak ada data makanan!"}
            data={exampleData}
            totalRow={3}
            totalCol={10}
            renderItem={(data) => {
                return (
                <tr key={data?.id}>
                    <td>{data?.code}</td>
                    <td>{data?.name}</td>
                </tr>
                );
            }}
            />
        </KriteriaContainer>
    )
}