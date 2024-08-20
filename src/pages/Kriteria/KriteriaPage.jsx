import { Button } from "../../components/UIReu/Buton/Button";
import { Transparent } from "../../components/UIReu/Buton/Transparent";
import { CustomModal } from "../../components/UIReu/Modal/Modal";
import { Rowtable } from "../../components/UIReu/Table/Rowtable";
import { useState, useEffect } from 'react'
import plus from "../../assets/images/plus.png"
import { theadAllKriteria } from "../../Utils/dataObj";
import { KriteriaContainer } from "./KriteriaContainer";
import Input from "../../components/UIReu/Form/Input";
import { deleteForm, getForm, sendForm, updateForm } from "../../api";
import { ErrMsg } from "../../components/Error/ErrMsg";
import useForm from "../../hooks/UseForm";
import { dataCriteria, validateCriteriaForm, validateCriteriaIsChanges } from "../../Utils/validation";
import { SpinnerSM } from "../../components/Loader/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";



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

const initState = {
    offset: null,
    loadingEdit: false,
}

export const KriteriaPage = () => {

    const [editedData, setEditedData] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [offset, setOffset] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data , setData ] = useState([]);
    // const [form, setForm] = useState({
    //     code: '',
    //     name: '',
    //     bobot: '',
    //     tren: '',
    // });

    const {
        form,
        setForm,
        handleInput,
        loading,
        setLoading,
        handleChange,
    } = useForm(initState)

   
    const handleModal = (data, offset) => {
        setEditedData(data);
        setOffset(offset);
        setForm(data);
        setEditModal(true);
    };


    // const handlePostCriteria = async (data) => {
    //     setLoading(true);
    //     const formData = dataCriteria(data);
        
    //     try {
    //         await sendForm(formData);
    //         fetchData();
    //         console.log("Data masuk", res.data)
    //         setAddModal(false);
    //     } catch (error) {
    //         console.log("Error posting data", error);
    //     }
    // };

    // const handlePostCriteria = async (data) => {
    //     setLoading(true);
    //     const formData = dataCriteria(data); 
    //     try {
    //         const res = await sendForm(formData);
    //         if (res.status === 201) {
    //             fetchData()
    //             toast.success("Anda berhasil menambahkan kriteria", { delay: 800 });
    //         }
    //     } catch (error) {
    //         toast.error("Anda gagal menambahkan kriteria", { delay: 800 });
    //         console.error(error);
    //     } finally {
    //         setAddModal(false);
    //         setLoading(false);
    //     }
    // };


    // const handleEditCriteria = async (data) => {
    //     setLoading(true); 
    //     const formData = dataCriteria(data); 
    //     try {
    //         const res = await updateForm(data.id, formData);
    //         console.log('Response from updateForm:', res);
    //         if (res.status === 200) {
    //             fetchData(); 
    //             toast.success("Anda berhasil mengubah kriteria", { delay: 800 });
    //         }
    //     } catch (error) {
    //         toast.error("Anda gagal mengubah kriteria", { delay: 800 });
    //         console.error("Error updating data", error);
    //     } finally {
    //         setEditModal(false); 
    //         setLoading(false); 
    //     }
    // };


    // const handleDelete = (id) => {
    //     deleteForm(id)
    //     .then((res) => {
    //         console.log('Data berhasil terhapus di API => ', res.data);
    //         const updatedData = data.filter(item => item.id !== id);
    //         setData(updatedData);
    //         toast.success('Data berhasil dihapus');
    //         setEditModal(false);
    //     })
    //     .catch((err) => {
    //         console.log('Ada Kesalahan dalam code', err);
    //         toast.error('Gagal menghapus data');
    //     });
    // };

    const fetchData = async () => {
        try {
        const response = await axios.get("http://localhost:3000/api/v1/criteria")
        console.log("API Response:", response.data);
        setData(response.data.data.allCriteria); 
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
      


    const handlePostCriteria = async (data) => {
        setLoading(true);
        const formData = dataCriteria(data); 
    
        console.log("Form Data to be sent:", formData);
    
        try {
            const res = await axios.post('http://localhost:3000/api/v1/criteria/create', formData);
            //     headers: {
            //         'Content-Type': 'application/json', 
            //         'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJmYXJ6ZXQiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWludXNlcnpldEBnbWFpbC5jb20iLCJpYXQiOjE3MTk5MDAyMzcsImV4cCI6MTcyMDE1OTQzN30.VflHkndAXwggjIgWOwc5CQIgA2sYfYZcaA5tUSY1kRI`,

            //     },
            //     withCredentials: false
            // });

            console.log("Response:", res);
    
            if (res.status === 201) {
                fetchData();
                toast.success("Anda berhasil menambahkan criteria", { delay: 800 });
            } else {
                toast.error("Terjadi kesalahan saat menambahkan criteria", { delay: 800 });
                console.error("Unexpected response status:", res.status);
            }
        } catch (error) {
            toast.error("Anda gagal menambahkan criteria", { delay: 800 });
            console.error("Error:", error);
        } finally {
            setAddModal(false);
            setLoading(false);
        }
    };
    

    const handleEditCriteria = async (data) => {
        setLoading(true); 
        const formData = dataCriteria(data); 
        console.log("Form Data:", formData);
        try {
            const res = await axios.patch(`http://localhost:3000/api/v1/criteria/${data.id}`, formData);
            if (res.status === 200) {
                setData((prevData) => 
                    prevData.map((item) => (item.id === data.id ? { ...item, ...data } : item))
                ); 
                toast.success("Anda berhasil mengubah criteria", { delay: 800 });
            }
        } catch (error) {
            toast.error("Anda gagal mengubah criteria", { delay: 800 });
            console.error("Error updating data", error);
        } finally {
            setEditModal(false); 
            setLoading(false); 
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/v1/criteria/${id}`, {
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
    


    return (
        <>
        <KriteriaContainer
            className={'border'}
            thead={theadAllKriteria}
            setAddModal={setAddModal}>
            <Rowtable
            data={data}
            ifEmpty={"Tidak ada data kriteria!"}
            totalRow={5}
            totalCol={10}
            renderItem={(data, index, offset) => {
                return (
                <tr
                    onClick={() => handleModal(data, offset)}
                    data-bs-toggle="modal" data-bs-target="#medicineModal"
                    className="text-nowrap cursor-pointer"
                    key={data?.id}
                >
                    {/* <td>{data?.id}</td> */}
                    <td>{data?.criteria_code}</td>
                    <td>{data?.criteria_name}</td>
                    <td>{data?.bobot}</td>
                    <td>{data?.tren}</td>
                </tr>
                );
            }}
            />
        </KriteriaContainer>
        {editModal &&
            <KriteriaModal
            title={'Informasi Criteria'}
            data={editedData}
            offset={form.offset}
            handleDelete={handleDelete}
            handleAction={handleEditCriteria}
            setEditModal={setEditModal} />
        }
        {addModal &&
            <KriteriaModal
            offset={form.offset}
            title={'Tambah Criteria'}
            handleInput={handleInput}
            setForm={setForm}
            data={form}
            forModal={'post'}
            handleAction={handlePostCriteria}
            setEditModal={setAddModal} />
        }
        </>
    );
};

const KriteriaModal = ({
    title,
    data,
    setEditModal,
    forModal,
    loading,
    handleAction,
    handleDelete,
    offset
}) => {

    let initState = {
        id: data?.id ?? '',
        criteria_code: data?.criteria_code ?? '',
        criteria_name: data?.criteria_name ?? '',
        bobot: data?.bobot ?? '',
        tren: data?.tren ?? '',
    }

    let errorState = {
        criteria_code: '',
        criteria_name: '',
        bobot: '',
        tren: '',
    }

    // const [loading, setLoading] = useState(true);
    const [isFormChanged, setIsFormChanged] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const {
        form,
        setForm,
        handleInput,
        handleChange,
        errors,
        setErrors
    } = useForm(initState, errorState);



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("next")
        if (validateCriteriaForm(form, setErrors)) {
            handleAction(form)
            console.log("masuk?")
        }
        else{
            console.log("ga masuk?")
        }
    }

    useEffect(() => {
        const isChanged = validateCriteriaIsChanges(form, data);
        setIsFormChanged(isChanged);
    }, [form, data]);


    const handleDeleteAction = () => {
        handleDelete(data?.id, offset);
        setDeleteConfirm(false);
    };

    return (
    <>
    {deleteConfirm &&
        <Transparent
            disabled={true}
            style={{ zIndex: 55 }}
        >
            <CustomModal
            title={'Hapus Kriteria?'}
            content={'Apabila anda menghapus Criteria, data keseluruhan criteria akan hilang'}
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
                    <label htmlFor="criteria_code" className="col-sm-3 col-form-label ">
                    Kode Kriteria
                    </label>
                    <div className="col-sm-9">
                    <input
                        type="text"
                        className="form-control"
                        id="criteria_code"
                        name="criteria_code"
                        value={form.criteria_code}
                        onChange={handleInput}
                    />
                    <ErrMsg msg={errors.code} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="criteria_name" className="col-sm-3 col-form-label">
                    Nama Kriteria
                    </label>
                    <div className="col-sm-9">
                    <input
                        type="text"
                        className="form-control"
                        id="criteria_name"
                        name="criteria_name"
                        value={form.criteria_name}
                        onChange={handleInput}
                    />
                    <ErrMsg msg={errors.name} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="bobot" className="col-sm-3 col-form-label ">
                    Bobot Kriteria
                    </label>
                    <div className="col-sm-9">
                    <input
                        type="text"
                        className="form-control"
                        id="bobot"
                        name="bobot"
                        value={form.bobot}
                        onChange={handleInput}
                    />
                    <ErrMsg msg={errors.bobot} />
                    </div>
                </div>
                
                <div className="mb-3 row">
                    <label htmlFor="trenCriteria" className="col-sm-3 col-form-label">
                        Tren
                    </label>
                    <div className="d-flex gap-2 ">
                    <Input
                        type="radio"
                        id="Positif"
                        name="tren"
                        value="Positif"
                        checked={form.tren === "Positif"}
                        onChange={handleChange}
                        // defaultChecked={form.tren === "Positif"}
                    />
                    <label htmlFor="Positif">Positif</label>
                    </div>
                    <div className="d-flex gap-2 ">
                    <Input
                        type="radio"
                        id="Negatif"
                        name="tren"
                        value="Negatif"
                        checked={form.tren === "Negatif"}
                        onChange={handleChange}
                        // defaultChecked={form.tren === "Negatif"}
                    />
                    <label htmlFor="Negatif">Negatif</label>
                    </div>
                </div>
                <ErrMsg msg={errors.tren} />

                
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
                {loading
                  ? <SpinnerSM />
                  : 'Simpan'
                }
                </Button>
                <Button
                    disabled={forModal === 'post' || loading}
                    type="button"
                    onClick={() => setDeleteConfirm(true)}
                    className="btn-outline-primary fw-semibold border-2 text-nowrap"
                >
                    Hapus
                </Button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </>
    )
}




