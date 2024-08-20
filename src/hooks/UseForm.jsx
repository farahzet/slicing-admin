import { useState } from "react";

const useForm = (initialState, initialError) => {
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState(initialError)
    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
        ...prevForm,
        [name]: value
        }));
    };

    const handleInputChange = (e, item) => {
        const { value } = e.target;
    
        setForm(prevForm => {
            const updatedCriteriaValues = prevForm.criteriaValues.filter(cv => cv.id !== item.id);
            return {
                ...prevForm,
                criteriaValues: [
                    ...updatedCriteriaValues,
                    {
                        id: item.id,
                        criteria_name: item.criteria_name,
                        calculation: value,
                    }
                ]
            };
        });
    };

    // const handleInputChange = (e, item) => {
    //     const { value } = e.target;
    //     console.log("Changing criteria:", item.criteria_name, "with id:", item.id, "to value:", value);
    
    //     setForm(prevForm => {
    //         const updatedCriteriaValues = prevForm.criteriaValues.filter(cv => cv.id !== item.id);
    //         return {
    //             ...prevForm,
    //             criteriaValues: [
    //                 ...updatedCriteriaValues,
    //                 {
    //             ]
    //         };
    //     });
    // };


    

    const handleInputCriteria = (criteriaName, value) => {
        setForm(prevForm => ({
            ...prevForm,
            criteria_values: {
                ...prevForm.criteria_values,
                [criteriaName]: value
            }
        }));
    };

    return {
        form,
        setForm,
        errors,
        setErrors,
        handleInput,
        setLoading,
        handleChange,
        handleInputCriteria,
        handleInputChange,
        loading
    }
}

export default useForm;