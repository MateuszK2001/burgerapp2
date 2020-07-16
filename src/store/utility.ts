const updateObject = (old:any, changes:any)=>{
    return{
        ...old,
        ...changes
    };
};

export default updateObject;