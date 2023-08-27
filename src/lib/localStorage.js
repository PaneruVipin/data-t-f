export const getFromLocalStorage = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error("get data in localstorage:", e);
      return "";
    }
  };
  
  export const setInLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("set data in localstorage:", e);
    }
  };
  
  export const removeFromLocalStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("remove data in localstorage:", e);
    }
  };
  
  export const clearLocalStorage = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error("remove all data in localstorage:", e);
    }
  };