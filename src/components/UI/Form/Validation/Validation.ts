export interface Validation{
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
}
const validate = (value:string, validation?:Validation)=>{
    if(!validation) return true;
    let valid = true;
    if(
            (validation.required && value.trim().length === 0)
        ||  (validation.minLength && value.length < validation.minLength)
        ||  (validation.maxLength && value.length > validation.maxLength)
        ||  (validation.pattern && new RegExp(validation.pattern).test(value))
    )
        valid = false;        
    return valid;
};

export default validate;