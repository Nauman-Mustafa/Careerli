// @ts-nocheck
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState } from "react";
import { ReactReduxContext, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "use-http";
import "./assets/style/mainStyle.scss";
import { ThemeContext } from "./contexts/theme-context";
import { MainRoutes } from "./routes";
const API_ENDPOINT = import.meta.env.VITE_BASE_URL;
function App() {
  const auth: any = useSelector((store: any) => store.auth);
  const { store } = useContext(ReactReduxContext);
  const isBrowserDefaultDark = () =>
    window.matchMedia("(prefers-color-scheme: dark-mode)").matches;
  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem("default-theme");
    const browserDefault = isBrowserDefaultDark() ? "dark-mode" : "light-mode";
    return localStorageTheme || browserDefault;
  };
  const [theme, setTheme] = useState(getDefaultTheme());
  const options = {
    suspense: false,
    cacheLife: 0,

    cachePolicy: "no-cache",
    interceptors: {
      // every time we make an http request, this will run 1st before the request is made
      // url, path and route are supplied to the interceptor
      // request options can be modified and must be returned
      request: async function ({ options, url, path, route }: any) {
        options.headers.Authorization = `Bearer ${
          store.getState().auth?.access_token
        }`;

        return options;
      },
    },
  };

  return (
    <Provider url={API_ENDPOINT} options={options}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`App ${theme}`}>
          <MainRoutes />
          <ToastContainer />
        </div>
      </ThemeContext.Provider>
    </Provider>
  );
}
export default App;
