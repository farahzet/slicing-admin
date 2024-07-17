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

    const handleChange = (name, value) => {
        setForm(prevForm => ({
        ...prevForm,
        [name]: value
        }));
    };

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
        loading
    }
}

export default useForm;