import { thead } from "../../Utils/dataObj";
import { Rowtable } from "../../components/UIReu/Table/Rowtable";
import { UserTable } from "./UserTable";
import axios from "axios";
import { useState, useEffect } from 'react'


// import './user.css'


const exampleData = [
    {
        id: 1,
        nama: 'Farah Nisa',
        email: 'Farahzet@gmail.com',
    },
    {
        id: 2,
        nama: 'Farah Nisa',
        email: 'Farahzet@gmail.com',
    },
    {
        id: 3,
        nama: 'Farah Nisa',
        email: 'Farahzet@gmail.com',
    },
];
  
export const UserPage = () => {
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data , setData ] = useState([]);

    const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/v1/user/user-register", {
            headers: {
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJmYXJ6ZXQiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWludXNlcnpldEBnbWFpbC5jb20iLCJpYXQiOjE3MTk5MDAyMzcsImV4cCI6MTcyMDE1OTQzN30.VflHkndAXwggjIgWOwc5CQIgA2sYfYZcaA5tUSY1kRI`,
            },
          });
          console.log("API Response:", response.data);
        setData(response.data.data.endUsers); // Asumsi data berada di dalam results
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
    return (
        <UserTable
        thead={thead}
        pageFor={'homepage'}
        className={'border'}
        maxHeight={'45rem'}
        >
        <Rowtable
            ifEmpty={"Tidak ada data Riwayat Pemilihan!"}          
            data={data}
            totalRow={3}
            totalCol={8}
            renderItem={(data, index, offset) => {
                return (
                <tr
                    className="text-nowrap cursor-pointer"
                    key={data?.id}
                >
                    {/* <td>{data?.id}</td> */}
                    <td>{data?.CreatedAt}</td>
                    <td>{data?.username}</td>
                    <td>{data?.email}</td>
                    <td>{data?.phone}</td>
                </tr>
                );
            }}
            />

        </UserTable>
    )
}