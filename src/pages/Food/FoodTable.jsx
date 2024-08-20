import { theadAllFood } from "../../Utils/dataObj";
import { Rowtable } from "../../components/UIReu/Table/Rowtable";
import { KriteriaContainer } from "../Kriteria/KriteriaContainer";
import { FoodTableContainer } from "./FoodTableContainer";
import { useState, useEffect } from 'react'



const exampleData = [
    {
        id: 1,
        code: 'F001',
        name: 'Nasi Goreng',
        carbo: 45,
        protein: 15,
        lemak: 10,
        desc: "-",
    },
    {
        id: 2,
        code: 'F002',
        name: 'Ayam Bakar',
        carbo: 0,
        protein: 35,
        lemak: 20,
        desc: "-",
    },
    {
        id: 3,
        code: 'F003',
        name: 'Gado-Gado',
        carbo: 30,
        protein: 10,
        lemak: 15,
        desc: "-",
    },
    {
        id: 4,
        code: 'F004',
        name: 'Sate Kambing',
        carbo: 5,
        protein: 25,
        lemak: 30,
        desc: "-",
    },
    {
        id: 5,
        code: 'F005',
        name: 'Soto Ayam',
        carbo: 20,
        protein: 18,
        lemak: 12,
        desc: "-",
    }
];

export const FoodTable = () => {

    const [thead, setThead] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fungsi untuk mengambil data dari backend
        const fetchData = async () => {
        try {
            const response = await fetch(`localhost:3000/api/v1/food`); 
            const result = await response.json();

            if (Array.isArray(result) && result.length > 0) {
            const headers = Object.keys(result[0]);
            setThead(headers);
            setData(result);
            } else {
            console.error('Data tidak valid');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        };

        fetchData();
    }, []);

    return(
        <FoodTableContainer
            thead={thead}
            pageFor={'homepage'}
            className={'border'}
            maxHeight={'45rem'}
            >
            <Rowtable
            ifEmpty={"Tidak ada data makanan!"}
            data={data}
            totalRow={7}
            totalCol={10}
            renderItem={(data,index) => {
                return (
                <tr onClick={() => onNavigate(data)}
                    className="text-nowrap cursor-pointer"
                    key={index}>
                    {/* <td>{data?.id}</td>
                    <td>{data?.code}</td>
                    <td>{data?.name}</td>
                    <td>{data?.carbo}</td>
                    <td>{data?.protein}</td>
                    <td>{data?.lemak}</td>
                    <td>{data?.desc}</td> */}
                    {Object.values(data).map((value, i) => (
                    <td key={i}>{value}</td>
                ))}
                </tr>
                );
            }}
            />
        </FoodTableContainer>
    )
}