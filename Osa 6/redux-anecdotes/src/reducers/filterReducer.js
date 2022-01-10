const initialState = ""

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FILTER_CHANGE": {
            return action.data
        }
        default: return state
    }
    
}

export const filterChange = (filter) => {
    return {
        type : "FILTER_CHANGE",
        data : filter
    }
}



export default filterReducer