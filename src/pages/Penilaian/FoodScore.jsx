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
                const response = await axios.get('http://localhost:3000/api/v1/food/table-name-score');
                const foodHeaders = response.data.data.food;
                const criteriaHeaders = response.data.data.criteria;

                // Ubah nama kolom sesuai kebutuhan frontend
                const transformedFoodHeaders = foodHeaders.map(header => {
                    switch (header) {
                        case 'id':
                            return 'No';
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
          const response = await axios.get("http://localhost:3000/api/v1/foodCriteria/CPI")

        //     headers: {
        //       'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJmYXJ6ZXQiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWludXNlcnpldEBnbWFpbC5jb20iLCJpYXQiOjE3MTk5MDAyMzcsImV4cCI6MTcyMDE1OTQzN30.VflHkndAXwggjIgWOwc5CQIgA2sYfYZcaA5tUSY1kRI`,
        //     },
        //   });
          console.log("API Response:", response.data);
          setData(response.data?.data??[]);
        setIsPending(false);
        } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
        setIsPending(false);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    
      console.log("Data to be passed to Rowtable:", data);


    return(
        <TableContainer
        title={"Nilai Alternatif"}
        thead={headers}
        className={'border'}
        >
            <Rowtable
            data={data}
            ifEmpty={"Tidak ada data makanan!"}
            totalRow={5}
            totalCol={5}
            isPending={isPending}
            isError={isError}
            refetch={fetchData}
            renderItem={(data, index) => {
                return (
                <tr
                className="text-nowrap cursor-pointer"
                key={index}
                >
                <td>{index + 1}</td>
                <td>{data?.food_name}</td>
                <td>{data?.food_desc}</td>
                {headers.slice(3).map(header => (
                        <td key={header}>{data?.criteria_values.find(criteria => criteria.criteria_name === header)?.calculation_tren}</td>
                    ))}
                </tr>
            );
            }}
            />
        </TableContainer>
    )
}