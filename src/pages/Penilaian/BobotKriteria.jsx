import { Rowtable } from "../../components/UIReu/Table/Rowtable"
import { TableContainer } from "../../components/UIReu/Table/TableContainer"
import { useState, useEffect } from 'react'
import axios from "axios";

export const BobotKriteria = () => {

    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchTableMetadata = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/criteria/criteria-thead');
                const criteriaHeaders = response.data; 

                setHeaders(criteriaHeaders);

            } catch (error) {
                console.error("Error fetching table metadata:", error);
            }
        };

        fetchTableMetadata();
    }, []);


    // useEffect(() => {
    //     const fetchTableMetadata = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:3000/api/v1/criteria/criteria-thead');
    //             const criteriaHeaders = response.data.criteriaData;


    //             const combinedHeaders = [ ...criteriaHeaders];
    //             setHeaders(combinedHeaders);
    //         } catch (error) {
    //             console.error("Error fetching table metadata:", error);
    //         }
    //     };

    //     fetchTableMetadata();
    // }, []);

    return(
        <TableContainer
            title={"Bobot Kriteria"}
            className={'border'}
            thead={headers} // Gunakan prop thead untuk mengirimkan headers ke TableContainer
        >
          
            <Rowtable
                ifEmpty={"Tidak ada data Bobot Kriteria!"}
                totalCol={headers.length + 1}
                renderItem={(data, index, offset) => {
                    return (
                        <tr key={index}>
                            {headers.map(header => (
                                <td key={header.criteria_code}>
                                    {data[header.criteria_code]}
                                </td>
                            ))}
                            <td>{data.bobot}</td> {/* Pastikan 'bobot' tersedia di dalam data */}
                        </tr>
                    )
                }}
            />
        </TableContainer>
    )
}