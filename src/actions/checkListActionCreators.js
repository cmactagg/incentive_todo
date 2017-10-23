export function fetchAllCheckLists() {
  console.log("starting fetchallchecklists");
  return {
    type: "CHECKLISTS_FETCH_ALL"
  };
}
export function storeCheckLists(checkLists) {
  return {
    type: "CHECKLISTS_STORE",
    data: checkLists
  };
}
export function saveCheckLists() {
  return {
    type: "CHECKLISTS_SAVE"
  };
}

export function checkListsAddCheckList(text) {
  return {
    type: "CHECKLISTS_ADD_CHECKLIST",
    data: { id: Date.now(), text: text, isChecked: false }
  };
}

export function checkListAddItem(checkListId, text) {
  return {
    type: "CHECKLIST_ADD_ITEM",
    checkListId: checkListId,
    data: { id: Date.now(), text: text, isChecked: false }
  };
}

export function checkListReorder(checkListId, oldIndex, newIndex) {
  return {
    type: "CHECKLIST_REORDER",
    checkListId: checkListId,
    oldIndex: oldIndex,
    newIndex: newIndex
  };
}

export function checkListItemChanged(checkListId, checkListItem) {
  return {
    type: "CHECKLIST_ITEM_CHANGED",
    checkListId: checkListId,
    checkListItem: checkListItem
  };
}

export function checkListHeaderChanged(checkListId, checkListItem) {
  return {
    type: "CHECKLIST_ITEM_CHANGED",
    checkListId: checkListId,
    checkListItem: checkListItem
  };
}
