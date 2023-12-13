import { createContext, useContext, useReducer } from "react";

const INITIAL_STATE = {
  isLoading: false,
  assetsGroupsData: [],
  assetsData: [],
  error: null,
};

const assetsReducer = (state, { payload, type }) => {
  switch (type) {
    case "PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "FULFILLED":
      return {
        ...state,
        isLoading: false,
        assetsGroupsData: payload.assetsGroupsData,
        assetsData: payload.assetsData,
      };
    case "REJECTED":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

const AssetsContext = createContext();

const AssetsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(assetsReducer, INITIAL_STATE);
  return (
    <AssetsContext.Provider value={{ state, dispatch }}>
      {children}
    </AssetsContext.Provider>
  );
};

export default AssetsProvider;

export const useAssets = () => useContext(AssetsContext);
