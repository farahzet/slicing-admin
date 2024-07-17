import { theadAllFood } from "../../Utils/dataObj";
import { Button } from "../../components/UIReu/Buton/Button";
import { Transparent } from "../../components/UIReu/Buton/Transparent";
import { CustomModal } from "../../components/UIReu/Modal/Modal";
import { FoodTableContainer } from "./FoodTableContainer";
import { useState, useEffect } from 'react'
import axios from "axios";

import plus from "../../assets/images/plus.png"
import { deleteForm, getForm, sendForm, updateForm } from "../../api";
import { dataFood, validateCriteriaFormFood, validateFoodForm, validateFormIsChanges } from "../../Utils/validation";
import { ErrMsg } from "../../components/Error/ErrMsg";
import useForm from "../../hooks/UseForm";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Rowtable } from "../../components/UIReu/Table/Rowtable";


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

const initState = {
    offset: null,
    loadingEdit: false,
}


export const FoodPage = () => {

    const {
        form,
        setForm,
        handleInput,
        loading,
        setLoading,
        handleChange,
    } = useForm(initState)

    const [editedData, setEditedData] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [offset, setOffset] = useState(null);
    const [data , setData ] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    const [headers, setHeaders] = useState([]);
    
    

    const handleModal = (data, offset) => {
        setEditedData(data);
        setOffset(offset);
        setForm(data);
        setEditModal(true);
    };

    // const handlePostForm = async (data) => {
    //     setLoading(true);
    //     const formData = dataFood(data); 
    //     try {
    //         const res = await sendForm(formData);
    //         // const res = await axios.post('http://localhost:3000/api/v1/food', formData);
    //         if (res.status === 201) {
    //             fetchData()
    //             toast.success("Anda berhasil menambahkan data makanan", { delay: 800 });
    //         }
    //     } catch (error) {
    //         toast.error("Anda gagal menambahkan data makanan", { delay: 800 });
    //         console.error(error);
    //     } finally {
    //         setAddModal(false);
    //         setLoading(false);
    //     }
    // };




    //   useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await axios.get("http://localhost:3000/api/v1/food", {
    //             headers: {
    //               'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMywidXNlcm5hbWUiOiJmYXJ6ZXQiLCJyb2xlIjoiZW5kVXNlciIsImVtYWlsIjoidXNlcnpldEBnbWFpbC5jb20iLCJpYXQiOjE3MTk4NDM1NzMsImV4cCI6MTcyMDEwMjc3M30.sgK1woDTPnyU_ixVA-j9cNHbMulVh6Uaqy7ttfRj4fo`, 
    //             },
    //           });
    //         console.log("API Response:", response.data);
    //         setData(response.data.results);
    //       } catch (error) {
    //         console.error("Error fetching data:", error);
    //       }
    //     };
    
    //     fetchData();
    //   }, []);

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

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const foodResponse = await axios.get('http://localhost:3000/api/v1/food', {
    //                 headers: {
    //                     'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJmYXJ6ZXQiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWludXNlcnpldEBnbWFpbC5jb20iLCJpYXQiOjE3MTk5MDAyMzcsImV4cCI6MTcyMDE1OTQzN30.VflHkndAXwggjIgWOwc5CQIgA2sYfYZcaA5tUSY1kRI`,
    //                 },
    //             });
    //             const criteriaResponse = await axios.get('http://localhost:3000/api/v1/criteria', {
    //                 headers: {
    //                     'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJmYXJ6ZXQiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWludXNlcnpldEBnbWFpbC5jb20iLCJpYXQiOjE3MTk5MDAyMzcsImV4cCI6MTcyMDE1OTQzN30.VflHkndAXwggjIgWOwc5CQIgA2sYfYZcaA5tUSY1kRI`,
    //                 },
    //             });

    //              const transformedFoodData = foodResponse.data.data.allFood.map(item => ({
    //                 id: `food-${item.id}`,
    //                 Kode: item.food_code,
    //                 'Nama Makanan': item.food_name,
    //                 Deskripsi: item.food_desc,
    //             }));

    //             const transformedCriteriaData = criteriaResponse.data.data.allCriteria.map(item => ({
    //                 id: `criteria-${item.id}`,
    //                 [item.criteria_name]: item.criteria_name,
    //                 // Tambahkan properti lain dari criteria jika diperlukan
    //             }));

    //             const combinedData = [...transformedFoodData, ...transformedCriteriaData];
    //             setData(combinedData);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);

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
    
      useEffect(() => {
        fetchData();
      }, []);
    
      console.log("Data to be passed to Rowtable:", data);
      


    const handlePostForm = async (data) => {
        setLoading(true);
        const formData = dataFood(data); 

        console.log("Form Data to be sent:", formData);

        try {
            const res = await axios.post('http://localhost:3000/api/v1/foodCriteria/food', formData);

            console.log("Response:", res);

            if (res.status === 201) {
                fetchData();
                toast.success("Anda berhasil menambahkan data makanan", { delay: 800 });
            } else {
                toast.error("Terjadi kesalahan saat menambahkan data makanan", { delay: 800 });
                console.error("Unexpected response status:", res.status);
            }
        } catch (error) {
            toast.error("Anda gagal menambahkan data makanan", { delay: 800 });
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error("Error response:", error.response.data);
            } else if (error.request) {
                // Request was made but no response was received
                console.error("Error request:", error.request);
            } else {
                // Something else happened in making the request
                console.error("Error message:", error.message);
            }
        } finally {
            setAddModal(false);
            setLoading(false);
        }
    }
    
    

    const handleEditFood = async (data) => {
        setLoading(true); 
        const formData = dataFood(data); 
        try {
            const res = await axios.patch(`http://localhost:3000/api/v1/food/${data.id}`, formData, {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJmYXJ6ZXQiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWludXNlcnpldEBnbWFpbC5jb20iLCJpYXQiOjE3MTk5MDAyMzcsImV4cCI6MTcyMDE1OTQzN30.VflHkndAXwggjIgWOwc5CQIgA2sYfYZcaA5tUSY1kRI`,
                    'Content-Type': 'application/json'
                }
            });
            if (res.status === 200) {
                fetchData(); 
                toast.success("Anda berhasil mengubah data makanan", { delay: 800 });
            }
        } catch (error) {
            toast.error("Anda gagal mengubah data makanan", { delay: 800 });
            console.error("Error updating data", error);
        } finally {
            setEditModal(false); 
            setLoading(false); 
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/v1/food/${id}`, {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJmYXJ6ZXQiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWludXNlcnpldEBnbWFpbC5jb20iLCJpYXQiOjE3MTk5MDAyMzcsImV4cCI6MTcyMDE1OTQzN30.VflHkndAXwggjIgWOwc5CQIgA2sYfYZcaA5tUSY1kRI`,
                }
            });
            console.log('Data berhasil terhapus di API => ', res.data);
            const updatedData = data.filter(item => item.id !== id);
            setData(updatedData);
            toast.success('Data berhasil dihapus');
            setEditModal(false);
        } catch (err) {
            console.error('Ada Kesalahan dalam code', err);
            toast.error('Gagal menghapus data');
        }
    };
    


    
    // const handleModal = (table, offset) => {
    //     setEditedData(table);
    //     setOffset(offset);
    //     setEditModal(true);
    // };


    return (
    <>
        <FoodTableContainer
        thead={headers}
        setAddModal={setAddModal}>
        <Rowtable
            data={data}
            ifEmpty={"Tidak ada data makanan!"}
            totalRow={7}
            totalCol={10}
            isPending={isPending}
            isError={isError}
            refetch={fetchData}
            renderItem={(data, index, offset) => {
                console.log("item data", data)
                return (
                <tr
                onClick={() => handleModal(data, offset)}
                data-bs-toggle="modal" data-bs-target="#medicineModal"
                className="text-nowrap cursor-pointer"
                key={data.id}
                >
                {/* {headers.map(header => (
                    <td key={header}>{item[header]}</td>
                ))} */}
                <td>{data?.food_code}</td>
                <td>{data?.food_name}</td>
                <td>{data?.food_desc}</td>
                {headers.slice(3).map(header => (
                        <td key={header}>{data.criteria_values.find(criteria => criteria.criteria_name === header)?.calculation}</td>
                    ))}
                </tr>
            );
            }}
        />
        </FoodTableContainer>
        {editModal &&
        <FoodModal
            title={'Informasi Produk'}
            data={editedData}
            offset={form.offset}
            handleInput={handleInput}
            form={form}
            setForm={setForm}
            handleDelete={handleDelete}
            handleAction={handleEditFood}
            setEditModal={setEditModal} />
        }
        {addModal &&
        <FoodModal
            offset={form.offset}
            title={'Tambah Produk'}
            handleInput={handleInput}
            data={form}
            setForm={setForm}
            forModal={'post'}
            handleAction={handlePostForm}
            setEditModal={setAddModal} />
        }
    </>
    );
};

const FoodModal = ({
    title,
    data,
    setEditModal,
    forModal,
    handleAction,
    handleDelete,
    offset,
    loading,
}) => {


    const [isFormChanged, setIsFormChanged] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [criteria, setCriteria] = useState([]);


    //   useEffect(() => {
    //     async function fetchCriteria() {
    //         try {
    //             const response = await axios.get('http://localhost:3000/api/v1/criteria/criteria-form', {
    //             headers: {
    //               'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJmYXJ6ZXQiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWludXNlcnpldEBnbWFpbC5jb20iLCJpYXQiOjE3MjAxMDY2NTgsImV4cCI6MTcyMDM2NTg1OH0.WFOfiPcbRdjuwnwqFmt-qWvN7fuiUZfObflDIQJvpsE`,
    //                 },
    //             });

    //             if (Array.isArray(response.data.data.criteria)) {
    //                 setCriteria(response.data.data.criteria);
    //                 initState.criteria_names = response.data.data.criteria.map(criterion => criterion.criteria_name);
    //             } else {
    //                 console.error('Invalid data format: expected an array');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching criteria:', error);
    //         }
    //     }

    //     fetchCriteria();
    // }, []);

    useEffect(() => {
        async function fetchCriteria() {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/criteria/criteria-form');

                if (Array.isArray(response.data.data.criteria)) {
                    setCriteria(response.data.data.criteria);
                } else {
                    console.error('Invalid data format: expected an array');
                }
            } catch (error) {
                console.error('Error fetching criteria:', error);
            }
        }

        fetchCriteria();
    }, []);

    let initState = {
        id: data?.id ?? '',
        food_code: data?.food_code ?? '',
        food_name: data?.food_name ?? '',
        food_desc: data?.food_desc ?? '',
        criteria_names: [],
    }

    let errorState = {
        food_code: '',
        food_name: '',
        food_desc: '',
    };

    // criteria.forEach(criterion => {
    //     initState[criterion] = data?.[criterion] ?? '';
    //     errorState[criterion] = '';
    // });

    criteria.forEach(criterion => {
        initState[criterion.criteria_name] = data?.[criterion.criteria_name] ?? '';
        errorState[criterion.criteria_name] = '';
    });


    const {
        form,
        setForm,
        handleInput,
        errors,
        setErrors
    } = useForm(initState, errorState);


    const handleSubmit = (e) => {
        e.preventDefault();
        // if (validateFoodForm(form, setErrors)) {
        //     handleAction(form)
        // }

        const isValidFood = validateFoodForm(form, setErrors);
        const isValidCriteria = validateCriteriaFormFood(form, setErrors, criteria);

        if (isValidFood && isValidCriteria) {
            handleAction(form);
        }
    }

    useEffect(() => {
    const isChanged = validateFormIsChanges(form, data,criteria);
    setIsFormChanged(isChanged);
    }, [form, data, criteria]);


    const handleDeleteAction = () => {
        handleDelete(data?.id, offset);
        setDeleteConfirm(false);
    }

    return (
    <>
        {deleteConfirm &&
        <Transparent
        disabled={true}
        style={{ zIndex: 55 }}
        >
            <CustomModal
            title={'Hapus Produk?'}
            content={'Apabila anda menghapus Produk, data keseluruhan produk akan hilang'}
            confirmAction={handleDeleteAction}
            cancelAction={() => setDeleteConfirm(false)}
            />
        </Transparent>
        }

        <div
        className="modal-backdrop"
        style={{
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            zIndex: '50'
        }}>
        </div>
        <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        style={{ display: "block", zIndex: '51' }}
        >
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0">
            <div className="modal-header">
                <h1 className="modal-title fs-2">
                {title}
                </h1>
                <button
                type="button"
                className="btn-close"
                onClick={() => setEditModal(false)}
                />
            </div>
            <div className="modal-body px-5">
                <form>
                <div className="mb-3 row">
                    <label htmlFor="food_code" className="col-sm-3 col-form-label ">
                    Kode
                    </label>
                    <div className="col-sm-9">
                    <input
                        type="text"
                        className="form-control"
                        id="food_code"
                        name="food_code"
                        value={form.food_code}
                        onChange={handleInput}
                    />
                    <ErrMsg msg={errors.food_code} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="food_name" className="col-sm-3 col-form-label">
                    Nama Makanan
                    </label>
                    <div className="col-sm-9">
                    <input
                        type="text"
                        className="form-control"
                        id="food_name"
                        name="food_name"
                        value={form.food_name}
                        onChange={handleInput}
                    />
                    <ErrMsg msg={errors.food_name} />
                    </div>
                </div>

                {/* {criteria.map((criterion) => (
                <div className="mb-3 row" key={criterion}>
                    <label htmlFor={criterion} className="col-sm-3 col-form-label">
                        {criterion}
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            id={criterion}
                            name={criterion.criteria_name}
                            value={form[criterion.criteria_name] || ''}
                            onChange={handleInput}
                        />
                        <ErrMsg msg={errors[criterion]} />
                    </div>
                </div>
            ))} */}

            {criteria.map((criterion, index) => (
                <div className="mb-3 row" key={index}>
                    <label htmlFor={`criterion_${index}`} className="col-sm-3 col-form-label">
                        {criterion.criteria_name}
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            id={`criterion_${index}`}
                            name={`criterion_${index}`}
                            value={form[criterion.criteria_name] || ''}
                            onChange={handleInput}
                        />
                        <ErrMsg msg={errors[criterion.criteria_name]} />
                    </div>
                </div>
            ))}


                {/* <div className="mb-3 row">
                    <label htmlFor="carbo" className="col-sm-3 col-form-label ">
                    Karbohidrat
                    </label>
                    <div className="col-sm-9">
                    <input
                        type="text"
                        className="form-control"
                        id="carbo"
                        name="carbo"
                        value={form.carbo}
                        onChange={handleInput}
                    />
                    <ErrMsg msg={errors.carbo} />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label
                    htmlFor="Protein"
                    className="col-sm-3 col-form-label"
                    >
                    Protein
                    </label>
                    <div className="col-sm-9">
                    <input
                        type="text"
                        className="form-control"
                        id="protein"
                        name="protein"
                        value={form.protein}
                        onChange={handleInput}
                    />
                    <ErrMsg msg={errors.protein} />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="lemak" className="col-sm-3 col-form-label ">
                    Lemak
                    </label>
                    <div className="col-sm-9">
                    <input
                        type="text"
                        className="form-control"
                        id="lemak"
                        name="lemak"
                        value={form.lemak}
                        onChange={handleInput}
                    />
                    <ErrMsg msg={errors.lemak} />
                    </div>
                </div> */}

                <div className="mb-3 row">
                    <label htmlFor="food_desc" className="col-sm-3 col-form-label ">
                    Deskripsi
                    </label>
                    <div className="col-sm-9">
                    <input
                        type="text"
                        className="form-control"
                        id="food_desc"
                        name="food_desc"
                        value={form.food_desc}
                        onChange={handleInput}
                    />
                    <ErrMsg msg={errors.food_desc} />
                    </div>
                </div>
                </form>
            </div>

            <div className="modal-footer">
                <div className="d-flex flex-row gap-3 justify-content-start w-100 align-items-center">
                    <Button
                    disabled={!isFormChanged || loading}
                    onClick={handleSubmit}
                    style={{ width: '7.125rem' }}
                    className={'btn-primary text-white fw-semibold'}
                    >
                    Simpan
                    </Button>
                    <Button
                    disabled={forModal === 'post' || loading}
                    type="button"
                    onClick={() => setDeleteConfirm(true)}
                    className="btn-outline-primary fw-semibold border-2 text-nowrap"
                    >
                    Hapus Produk
                    </Button>
                </div>
                </div>
            </div>
        </div>
        </div>
    </>
    )
}
