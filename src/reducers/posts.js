//a reducer takes in two things

//1. the action(infor about what happened)

//2. copy of the current state

function posts(state = [], action){
  switch(action.type){
    case 'INCREMENT_LIKES':
    console.log("Incrementing likes");
    // const i = action.index;
    // return [...state.slice(0, i),
    //   {...state[i], likes: state[i].likes + 1},
    // ...state.slice(i+1)]
    return [];
    
    default:
      return state;
  }
}
export default posts;