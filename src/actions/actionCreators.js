export function checkListsInitAll(data){
  return{
    type: 'CHECKLISTS_INIT_ALL',
    data: data
  }
}
export function checkListsAddCheckList(text){
  return{
    type: 'CHECKLISTS_ADD_CHECKLIST',
    data: { id: Date.now(), text: text, isChecked: false }
  }
}

export function checkListAddItem(checkListId, text){
  return{
    type: 'CHECKLIST_ADD_ITEM',
    checkListId: checkListId,
    data: { id: Date.now(), text: text, isChecked: false }
  }
}

export function checkListReorder(checkListId, oldIndex, newIndex){
  return{
    type: 'CHECKLIST_REORDER',
    checkListId: checkListId,
    oldIndex: oldIndex,
    newIndex: newIndex  
  
  }
}

  export function checkListItemChanged(checkListId, checkListItem){
    return{
      type: 'CHECKLIST_ITEM_CHANGED',
      checkListId: checkListId,
      checkListItem: checkListItem
    
    }
}

//increment
export function increment(index){
  return{
    type: 'INCREMENT_LIKES',
    index: index
  }
}


// //add comment
// export function addComment(postId, author, comment){
//   return {
//     type: 'ADD_COMMENT',
//     postId: postId,
//     author: author,
//     comment: comment
//   }
// }

// //remove comment
// export function removeComment(postId, i){
//   return{
//     type: 'REMOVE_COMMENT',
//     i: i,
//     postId: postId
//   }
// }

