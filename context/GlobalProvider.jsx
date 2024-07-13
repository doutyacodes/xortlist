import { useState, createContext, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      let result = await SecureStore.getItemAsync("user");
      // console.log(JSON.parse(result))
      return result ? JSON.parse(result) : null;
    } catch (error) {
      console.log("error:", error);
      return null;
    }
  };

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log("error:", error);
      })
      .finally(() => setIsLoading(false)); // Change made here
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
