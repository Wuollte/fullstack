const initialstate = ""

const popupReducer = (state=initialstate,action) => {
    switch (action.type) {
        case "SET_MESSAGE" : {
            return action.data
        }
        case "REMOVE_MESSAGE" : {
            return initialstate
        }
        default : return state
    }
}

export const setMessage = (message) => {
    return {
        type: "SET_MESSAGE",
        data: message
    }
}

export const removeMessage = () => {
    return {
        type : "REMOVE_MESSAGE"
    }
}

export default popupReducer
