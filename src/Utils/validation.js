export const validateFormIsChanges = (form, data, criteria) => {
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
    
    criteria.forEach(criterion => {
        const criterionName = criterion.criteria_name;
        if (form[criterionName] !== data[criterionName]) {
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
    const isNumber = (value) => /^\d+(\.\d+)?$/.test(value);

    // const isNumber = (value) => {
    //     return /^-?\d*\.?\d+$/.test(value);
    // };

    const newErrors = { 
        food_code: "",
        food_name: "",
        food_desc: "",
        
    };

    if(!form.food_code) {
        newErrors.food_code = 'Kode Makanan wajib diisi!'
        valid = false;
    }

    if(!form.food_name) {
        newErrors.food_name = 'Nama Makanan wajib diisi!'
        valid = false;
    }

    if (!form.food_desc) {
        newErrors.food_desc = 'Desc wajib diisi!';
        valid = false;
    }

    setErrors(newErrors);
    return valid;
}

export const validateCriteriaFormFood = (form, setErrors, criteria) => {
    let valid = true;
    const newErrors = {};

    const isNumber = (value) => /^\d+(\.\d+)?$/.test(value);

    criteria.forEach(criterion => {
        const value = form[criterion.criteria_name];
        if (!value) {
            newErrors[criterion.criteria_name] = `${criterion.criteria_name} wajib diisi!`;
            valid = false;
        } else if (!isNumber(value)) {
            newErrors[criterion.criteria_name] = `${criterion.criteria_name} harus berupa angka!`;
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
    return {
        criteria_code: form.criteria_code,
        criteria_name: form.criteria_name,
        bobot: form.bobot,
        tren: form.tren,
    };
};

// export const dataFood = (form) => {
//     return {
//         food_code: form.food_code,
//         food_name: form.food_name,
//         // carbo: form.carbo,
//         // protein: form.protein,
//         // lemak: form.lemak,
//         food_desc: form.food_desc,

//         criteria_values: {}
//     };

//     // Asumsikan criteria_names adalah array dari kriteria yang diambil dari form
//     data.criteria_names.forEach((criteria_name) => {
//         formData.criteria_values[criteria_name] = data[criteria_name];
//     });
// };

export const dataFood = (form) => {
    const formData = {
        food_code: form.food_code,
        food_name: form.food_name,
        food_desc: form.food_desc,
        criteria_values: {}
    };
    
    if (form.criteria_names && Array.isArray(form.criteria_names)) {
        form.criteria_names.forEach((criteria_name) => {
            if (form[criteria_name] !== undefined) {
                formData.criteria_values[criteria_name] = form[criteria_name];
            }
        });
    }

    return formData;
};