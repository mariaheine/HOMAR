// export const setLanguage = language => {
//   return (dispatch, getState) => {
//     dispatch({
//       type: "SET_LANGUAGE",
//       language: language
//     });
//   };
// };

export const setLanguage = language => ({
  type: "SET_LANGUAGE",
  language: language
});
