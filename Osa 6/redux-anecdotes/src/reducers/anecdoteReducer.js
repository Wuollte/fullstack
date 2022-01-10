import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE" : {
      const voted = state.find((x) => x.id === action.data.id);
      const newList = {
        ...voted,
        votes: voted.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== action.data.id ? anecdote : newList
      )
    }
    case "ADD" : {
      return [...state,action.data]
    }
    case "INIT" : {
      return action.data
    }
    default: return state
  }
}

export const voteAnecdote= (anecdote) => {
  return async dispatch => {
    const liked_anecdote = {...anecdote,votes:anecdote.votes+1}
    const updated = await anecdoteService.update(liked_anecdote)
    dispatch({
      type: "VOTE",
      data: updated
    })
  }
}
export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: "ADD",
      data: anecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type :"INIT",
      data : anecdotes
    })
  }
}

export default reducer