function journals(state = [[]], action) {
  switch (action.type) {
    case "JOURNAL_ADD_ENTRY":
      console.log("add entry to journal");
      var newState = [...state];
      // var journalIndex = newState.findIndex(cl => {
      //   return cl[0].id === action.journalId;
      // });
      newState[0].push(action.data);

      return newState;
    default:
      return state;
  }
}
export default journals;
