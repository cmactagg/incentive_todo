function checkLists(state = [], action) {
  switch (action.type) {
    case "CHECKLISTS_STORE":
      return action.data;

    case "CHECKLISTS_ADD_CHECKLIST":
      console.log("checklists add new checklist");
      var newState = [...state];
      newState.push([action.data]);

      return newState;

    case "CHECKLIST_ADD_ITEM":
      console.log("checklist add item");
      var newState = [...state];
      var checkListIndex = newState.findIndex(cl => {
        return cl[0].id === action.checkListId;
      });
      state[checkListIndex].push(action.data);

      return newState;

    case "CHECKLIST_REORDER":
      console.log("reordering items");
      var newState = [...state];
      var checkListIndex = newState.findIndex(cl => {
        return cl[0].id === action.checkListId;
      });

      var list = state[checkListIndex];
      var newIndex = action.newIndex + 1;
      var oldIndex = action.oldIndex + 1;
      var objectToMove = list.splice(oldIndex, 1)[0];

      if (newIndex > oldIndex) {
        oldIndex--;
      }

      list.splice(newIndex, 0, objectToMove);

      state[checkListIndex] = list;

      return newState;

    case "CHECKLIST_ITEM_CHANGED":
      console.log("item changed");
      var newState = [...state];
      var checkListIndex = newState.findIndex(cl => {
        return cl[0].id === action.checkListId;
      });

      var checkListItemIndex = state[checkListIndex].findIndex(cli => {
        return cli.id === action.checkListItem.id;
      });

      state[checkListIndex][checkListItemIndex] = action.checkListItem;

      return newState;

    default:
      return state;
  }
}
export default checkLists;
