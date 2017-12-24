export function journalsAddCheckList(text) {
  return {
    type: "JOURNALS_ADD_CHECKLIST",
    data: { id: Date.now(), text: text, isChecked: false }
  };
}

export function journalAddEntry(journalName, text, points) {
  return {
    type: "JOURNAL_ADD_ENTRY",
    journalName: journalName,
    data: { id: Date.now(), text: text, points:points }
  };
}
