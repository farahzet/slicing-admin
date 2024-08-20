import { Rowtable } from "../../components/UIReu/Table/Rowtable"
import { TableContainer } from "../../components/UIReu/Table/TableContainer"
import { theadCPI } from "../../Utils/dataObj"
import { useState, useEffect } from 'react'
import axios from "axios";


export const CPIResult = () => {

    const [data , setData ] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/v1/foodCriteria/CPI")
          // const responseRanking = await axios.get("http://localhost:3000/api/v1/foodCriteria/rank")
        //     headers: {
        //       'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJmYXJ6ZXQiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWludXNlcnpldEBnbWFpbC5jb20iLCJpYXQiOjE3MTk5MDAyMzcsImV4cCI6MTcyMDE1OTQzN30.VflHkndAXwggjIgWOwc5CQIgA2sYfYZcaA5tUSY1kRI`,
        //     },
        //   });
          console.log("API Response:", response.data);
          // console.log("API Response:", responseRanking.data);
          setData(response.data?.data??[]);
          // setData(responseRanking.data?.data??[]);
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
        title={"Perhitungan Hasil CPI"}
        thead={theadCPI}
        className={'border'}
        >
            <Rowtable
            data={data}
            ifEmpty={"Tidak ada data Perhitungan!"}
            totalRow={4}
            totalCol={8}
            isPending={isPending}
            isError={isError}
            refetch={fetchData}
            renderItem={(data, index) =>{
                return(
                    <tr
                    className="text-nowrap cursor-pointer"
                    key={index}
                    >
                    <td>{index + 1}</td>
                    <td>{data?.food_name}</td>
                    <td>{data?.total_score}</td>
                    <td>{data?.rank}</td>
                    </tr>
                )
            }}
            />
        </TableContainer>
    )
}