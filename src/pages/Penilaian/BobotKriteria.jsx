import { Rowtable } from "../../components/UIReu/Table/Rowtable"
import { TableContainer } from "../../components/UIReu/Table/TableContainer"
import { useState, useEffect } from 'react'
import axios from "axios";

export const BobotKriteria = () => {

    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    const [criteriaWeights, setCriteriaWeights] = useState([]);

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
          const resCriteria = await axios.get("http://localhost:3000/api/v1/criteria")
                console.log("API Response Kriteria:", resCriteria.data);
                setCriteriaWeights(resCriteria.data.data.allCriteria); 

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


    return(
        <TableContainer
            title={"Bobot Kriteria"}
            className={'border'}
            thead={headers} // Gunakan prop thead untuk mengirimkan headers ke TableContainer
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
                {headers.slice(3).map((header) => {
                const criteriaValue = data?.criteria_values.find(
                  (criteria) => criteria.criteria_name === header
                )?.calculation_tren;

                // Cari nilai bobot dari kriteria yang sesuai dengan header
                const criteriaWeight = criteriaWeights.find(
                  (criteria) => criteria.criteria_name === header
                )?.bobot || 1; // Jika tidak ada bobot, default ke 1

                // Kalikan nilai bobot dengan nilai calculation_tren
                // const calculatedValue = criteriaValue * criteriaWeight;
                const calculatedValue = parseFloat((criteriaValue * criteriaWeight).toFixed(2));


                return <td key={header}>{calculatedValue}</td>;
              })}
                </tr>
            );
            }}
            />
        </TableContainer>
    )
}