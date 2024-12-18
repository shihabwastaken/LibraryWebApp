// globalUser.js
let currentUserId = null;

export const setCurrentUserId = (id) => {
  currentUserId = id;
};

export const getCurrentUserId = () => {
  return currentUserId;
};

export const clearCurrentUserId = () => {
  currentUserId = null;
};
