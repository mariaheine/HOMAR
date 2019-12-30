import { SET_LINKED_URL, SET_EDITED_LANGUAGE } from "../types";

export const setLinkedUrl = linkedUrl => ({
  type: SET_LINKED_URL,
  linkedUrl: linkedUrl
});

export const setEditedLanguage = editedLanguage => ({
  type: SET_EDITED_LANGUAGE,
  editedLanguage: editedLanguage
});
