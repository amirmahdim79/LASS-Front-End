export const reducer = (state, action) => {
    switch (action.payload.type) {
        case 'reset':
            return {
                ...state,
                [action.payload.value]: false
            }  
        case 'set_all':
            return {
                ...state,
                [action.payload.value]: true
            }  
        case 'add_new_field':
            return {
                ...state,
                [action.payload.value]: action.payload.initialValue
            }    
        case action.payload.type:
            return {
                ...state,
                [action.payload.type]: action.payload.value
            }      
        default:
            return state;     
    }
}
