export const ValidateEmail = (email) => {
    if (email.includes(" ")) {
        return "Email or Password fields are required"
    } else {
        return "You have successfully logged in!";
    }
}


export const ValidatePassword = (password) => {
    if (password.length < 8) {
        return "Password or email can't contain less then 6 characters"
    } else {
        return "You have successfully logged in!";
    }
}