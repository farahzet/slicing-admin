import { Rowtable } from "../../components/UIReu/Table/Rowtable";
import { TableContainer } from "../../components/UIReu/Table/TableContainer";
import { useState, useEffect } from 'react'
import axios from "axios";


export const FoodScore = () => {
    const [data , setData ] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    const [headers, setHeaders] = useState([]);

    useEffect(() => {
        const fetchTableMetadata = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/food/table-name');
                const foodHeaders = response.data.data.food;
                const criteriaHeaders = response.data.data.criteria;

                // Ubah nama kolom sesuai kebutuhan frontend
                const transformedFoodHeaders = foodHeaders.map(header => {
                    switch (header) {
                        case 'food_code':
                            return 'Kode';
                        case 'food_name':
                            return 'Nama Makanan';
                        case 'food_desc':
                            return 'Deskripsi';
                        default:
                            return header;
                    }
                });

                const combinedHeaders = [...transformedFoodHeaders, ...criteriaHeaders];
                setHeaders(combinedHeaders);
            } catch (error) {
                console.error("Error fetching table metadata:", error);
            }
        };

        fetchTableMetadata();
    }, []);

    const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/v1/foodCriteria/food-cri")
        //     headers: {
        //       'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJmYXJ6ZXQiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWludXNlcnpldEBnbWFpbC5jb20iLCJpYXQiOjE3MTk5MDAyMzcsImV4cCI6MTcyMDE1OTQzN30.VflHkndAXwggjIgWOwc5CQIgA2sYfYZcaA5tUSY1kRI`,
        //     },
        //   });
          console.log("API Response:", response.data);
        setData(response.data.data); // Asumsi data berada di dalam results
        setIsPending(false);
        } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
        setIsPending(false);
        }
      };


    return(
        <TableContainer
        title={"Nilai Alternatif"}
        thead={headers}
        className={'border'}
        >
            <Rowtable
            data={data}
            ifEmpty={"Tidak ada data makanan!"}
            totalRow={7}
            totalCol={10}
            isPending={isPending}
            isError={isError}
            refetch={fetchData}
            renderItem={(item, index, offset) => {
                return (
                <tr
                className="text-nowrap cursor-pointer"
                key={item.id}
                >
                {headers.map(header => (
                    <td key={header}>{item[header]}</td>
                ))}
                </tr>
            );
            }}
            />
        </TableContainer>
    )
}