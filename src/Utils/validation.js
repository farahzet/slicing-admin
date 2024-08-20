export const validateFormIsChanges = (form, data, criteriaNames) => {
    let valid = false;
    
    if (form?.food_code !== data?.food_code) {
        valid = true;
    }
    if (form?.food_name !== data?.food_name) {
        valid = true;
    }

    if (form?.food_desc !== data?.food_desc) {
        valid = true;
    }

    if (form?.food_calories !== data?.food_calories) {
        valid = true;
    }

    criteriaNames.forEach(criteria_name => {
        if (form[`criteriaValues.${criteria_name}`] !== data[`criteriaValues.${criteria_name}`]) {
            valid = true;
        }
    });

    return valid;
}

export const validateCriteriaIsChanges = (form, data) => {
    let valid = false;
    
    if (form?.criteria_code !== data?.criteria_code) {
        valid = true;
    }
    if (form?.criteria_name !== data?.criteria_name) {
        valid = true;
    }
    if (form?.bobot !== data?.bobot) {
        valid = true;
    }
    if (form?.tren !== data?.tren) {
        valid = true;
    }
    
    return valid;
}


export const validateFoodForm = (form, setErrors) => {
    let valid = true;
    const newErrors = {
        food_code: "",
        food_name: "",
        food_desc: "",
        food_calories: "",
    };

    if (!form.food_code) {
        newErrors.food_code = 'Kode Makanan wajib diisi!';
        valid = false;
    }

    if (!form.food_name) {
        newErrors.food_name = 'Nama Makanan wajib diisi!';
        valid = false;
    }

    if (!form.food_desc) {
        newErrors.food_desc = 'Deskripsi wajib diisi!';
        valid = false;
    }

    if (!form.food_calories) {
        newErrors.food_calories = 'Kalori wajib diisi!';
        valid = false;
    }

    setErrors(newErrors);
    return valid;
};

export const validateLogin = (form, setError) => {
    let valid = true;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const newErrors = {
        email : '',
        password : '',
    }

    if (!form.email) {
        newErrors.email = 'Email wajib diisi!';
        valid = false;
    }

    if (!form.password) {
        newErrors.password = 'Password wajib diisi!';
        valid = false;
    }

    setError(newErrors);
    return valid;
}


// export const validateCriteriaFormFood = (form, setErrors, criteriaNames) => {
//     let valid = true;
//     const newErrors = {};

//     const isNumber = (value) => /^\d+(\.\d+)?$/.test(value);

//     criteriaNames.forEach(criteria_name => {
//         const value = form[`criteriaValues.${criteria_name}`];
//         if (!value) {
//             newErrors[criteria_name] = `${criteria_name} wajib diisi!`;
//             valid = false;
//         } else if (!isNumber(value)) {
//             newErrors[criteria_name] = `${criteria_name} harus berupa angka!`;
//             valid = false;
//         }
//     });

//     setErrors(newErrors);
//     return valid;
// };

export const validateCriteriaFormFood = (form, setErrors, criteriaNames) => {
    let valid = true;
    const newErrors = {};

    const isNumber = (value) => /^\d+(\.\d+)?$/.test(value);

    criteriaNames.forEach(item => {
        const value = form.criteriaValues.find(cv => cv.criteria_name === item.criteria_name)?.calculation;
        if (!value) {
            newErrors[item.criteria_name] = `${item.criteria_name} wajib diisi!`;
            valid = false;
        } else if (!isNumber(value)) {
            newErrors[item.criteria_name] = `${item.criteria_name} harus berupa angka!`;
            valid = false;
        }
    });

    setErrors(newErrors);
    
    return valid;
};

export const validateCriteriaForm = (form, setErrors) => {
    let valid = true;
    const isNumber = (value) => /^\d+(\.\d+)?$/.test(value);
    const newErrors = { 
        criteria_code: "",
        criteria_name: "",
        bobot: "",
        tren: "",
    };

    if(!form.criteria_code) {
        newErrors.criteria_code = 'Kode Critaria wajib diisi!'
        valid = false;
    }

    if(!form.criteria_name) {
        newErrors.criteria_name = 'Nama Criteria wajib diisi!'
        valid = false;
    }

    if (!form.bobot) {
        newErrors.bobot = 'Bobot wajib diisi!';
        valid = false;
    } else if (!isNumber(form.bobot)) {
        newErrors.bobot = 'Bobot harus berupa angka!';
        valid = false;
    }

    if (!form.tren) {
        newErrors.tren = "Tren wajib diisi!";
        valid = false;
    }

    setErrors(newErrors);
    return valid;

}

// export const dataCriteria = (form) => {
//     const data = new FormData();

//     data.append("code", form.code);
//     data.append("name", form.name);
//     data.append("bobot", form.bobot);
//     data.append("tren", form.tren);

//     return data;
// }

export const dataCriteria = (form) => {
    const formData = {
        criteria_code: form.criteria_code,
        criteria_name: form.criteria_name,
        bobot: form.bobot,
        tren: form.tren,

    }
    return formData;
};

export const loginAdmin = (form) => {
    const formData = {
        email: form.email,
        password: form.password,
    }
    return formData;
};


// export const dataFood = (form, criteriaNames) => {
//     const formData = {
//         food_code: form.food_code,
//         food_name: form.food_name,
//         food_desc: form.food_desc,
//         criteriaValues: {},
//     };

//     // criteriaNames.forEach(criteria_name => {
//     //     formData.criteriaValues[criteria_name] = form[`criteriaValues.${criteria_name}`];
//     // });

//     // criteriaNames.forEach(criteria_name => {
//     //     formData.criteriaValues[criteria_name] = form[criteria_name];
//     // });

//     if (criteriaNames && criteriaNames.length > 0) {
//         criteriaNames.forEach(criteria_name => {
//             formData.criteriaValues[criteria_name] = form[criteria_name];
//         });
//     }

//     return formData;
// };

export const dataFood = (form, criteriaNames) => {
    const formData = {
        food_code: form.food_code || '',
        food_name: form.food_name || '',
        food_desc: form.food_desc || '',
        food_calories: form.food_calories || '',
        criteriaValues: form.criteriaValues,
    };

    // if (criteriaNames && Array.isArray(criteriaNames)) {
    //     criteriaNames.forEach(criteria_name => {
    //         formData.criteriaValues[criteria_name] = {
    //             calculation: form.criteriaValues && form.criteriaValues[criteria_name] ? form.criteriaValues[criteria_name].calculation : ''
    //         };
    //     });
    // }

    // if (criteriaNames && Array.isArray(criteriaNames)) {
    //     criteriaNames.forEach(criteria_name => {
    //         formData.criteriaValues[criteria_name] = {
    //             calculation: form.criteriaValues && form.criteriaValues[criteria_name] ? form.criteriaValues[criteria_name] : { calculation: '' }
    //         };
    //     });
    // }

    // if (criteriaNames && Array.isArray(criteriaNames)) {
    //     criteriaNames.forEach(criteria_name => {
    //         formData.criteriaValues.push({
    //             criteria_name,
    //             calculation: form.criteriaValues && form.criteriaValues[criteria_name]?.calculation || '',
    //         });
    //     });
    // }


    return formData;
};
