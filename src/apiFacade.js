import links from "./settings";

const URL = links.server;

function apiFacade() {
  //............Demo Package..............\\
  const getDemoPack = () => {
    return fetch(URL + "/api/info/demoPackage").then(handleHttpErrors);
  };
  //.........................\\

  //............registerUser..............\\
  const registerUser = (user) => {
    const options = makeOptions("POST", false, {
      ...user,
    });
    return fetch(URL + "/api/user", options).then(handleHttpErrors);
  };
  //.........................\\
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };

  const fetchData = (url2) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + url2, options).then(handleHttpErrors);
  };

  const fetchAnyGET = (URL) => {
    const options = makeOptions("GET", false);
    return fetch(URL, options).then(handleHttpErrors);
  };
  const fetchNoOptions = (URL) => {
    return fetch(URL).then(handleHttpErrors);
  };
  const newPackage = (URL, tample) => {
    console.log("ina api facade: ")
    console.log(tample)
    const options = makeOptions("POST", false, tample);
    return fetch(URL, options);
  };
  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    getDemoPack,
    registerUser,
    fetchAnyGET,
    fetchNoOptions,
    newPackage,
  };
}
const facade = apiFacade();

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }

  return res.json();
}
export default facade;
