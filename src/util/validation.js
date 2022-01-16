const inputValidation = {
    name: ({ name }) => usernameValidation(name),
    email: ({ email }) => emailValidation(email),
    password: ({ password }) => passwordValidation(password),
}

const ValidationChecker = (data, validationType) => {
    const resultData = {
        fields: {},
        isValid: false,
        error: ''
    }

    if (!data) {
        resultData.error = 'Invalid Data.'
        return resultData
    }

    const isFieldsValid = contentValidation(data, validationType);

    if (!isFieldsValid.valid) {
        resultData.error = 'Please fill all required fields.'
        resultData.valid = isFieldsValid.valid
        return resultData
    }

    isFieldsValid.fieldData.forEach(type => {
        const validationFunction = inputValidation[type];
        resultData.fields[type] = validationFunction(data)
    })

    const falseCurrent = Object.keys(resultData.fields).filter(e => !resultData.fields[e].valid)
    resultData.isValid = falseCurrent.length ? false : true;
    let lastMessege = []
    falseCurrent.forEach(elem => { lastMessege.push(elem) })
    resultData.error = lastMessege
    return resultData

}

function contentValidation(data, type) {
    let isValid = false;
    const requiredRegister = ['username', 'email', 'password'];
    const requiredSignIn = ['password', 'email'];

    let fieldData = ''

    switch (type) {
        case 'signin':
            fieldData = requiredSignIn;
            break
        case 'register':
            fieldData = requiredRegister;
            break
        default:
            break
    }

    const fields = Object.keys(data)
    const filtered = fieldData.filter(elem => fields.includes(elem))

    switch (type) {
        case 'signin':
            isValid = filtered.length === requiredSignIn.length;
            break;
        case 'register':
            isValid = filtered.length === requiredRegister.length;
            break;
        default:
            break;
    }

    return {
        valid: isValid,
        fieldData
    };
}

function emailValidation(email) {
    const sampleForEmail = /\S+@\S+\.\S+/
    if (sampleForEmail.test(email)) {
        return {
            valid: true,
            error: ''
        }
    }
    else return {
        valid: false,
        error: 'email'
    }
}

function usernameValidation(username) {
    if (username.length > 3) {
        return {
            valid: true,
            error: ''
        }
    }
    else return {
        valid: false,
        error: 'username'
    }
}

function passwordValidation(password) {
    const sampleForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/

    if (sampleForPassword.test(password)) {
        return {
            valid: true,
            error: ''
        }
    }

    else return {
        valid: false,
        error: 'password'
    }
}
export default ValidationChecker;
