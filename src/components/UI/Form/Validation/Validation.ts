export interface Validation{
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    isEmail?: boolean;
    pattern?: string;
}
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const validate = (value:string, validation?:Validation)=>{
    if(!validation) return true;
    let valid = true;

    if(
            (validation.required && value.trim().length === 0)
        ||  (validation.minLength && value.length < validation.minLength)
        ||  (validation.maxLength && value.length > validation.maxLength)
        ||  (validation.pattern && !(new RegExp(validation.pattern).test(value)))
        ||  (validation.isEmail && !emailRegex.test(value))
    )
        valid = false;        
    return valid;
};

export default validate;