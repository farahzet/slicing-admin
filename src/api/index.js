import axios from "axios"

const baseURL = "localhost:3000/api/v1/food"

export const getForm = () => {
    return axios({
        url: `${baseURL}/form`,
        method: "GET",
        headers:{
            "Content-Type": "application/json",
        },
    })
}

export const sendForm = (data) => {
    return axios.post(`${baseURL}/form`,data,{
        headers:{
            "Content-Type": "application/json"
        },
    })
}

// export const updateForm = (data) => {
//     return axios.put(`${baseURL}/form/${data.id}`,data,{
//         headers:{
//             "Content-Type": "application/json"
//         },
//     })
// }

export const updateForm = (id, data) => {
    return axios.put(`${baseURL}/form/${id}`, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
};




export const deleteForm = (id) => {
    return axios.delete(`${baseURL}/form/${id}`,{
        headers:{
            "Content-Type": "application/json"
        },
    })
}