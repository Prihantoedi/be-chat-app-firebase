function convertToEmail(preffix, provider){
    if(preffix.includes(" ")){
        return "preffix contains white space";
    }
    if(provider === "yahoo"){
        return `${preffix}@yahoo.com`;
    } else if (provider === "google"){
        return `${preffix}@gmail.com`;
    } else{
        return "Provider not found";
    }
}


exports.convertToEmail = convertToEmail;