export const reducer = (state, action) => {
    switch (action.payload.type) {
        case 'reset':
            return {...action.payload.value}
        case 'set_all_states':
            return {
                ...action.payload,
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
