
//we're putting all the API functions here so that we can easily change the base URL when
//we eventually host the application. 


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export async function registerUser(username, password) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.msg || "Registration failed");
  }
}

export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid username or password");
  }

  return res.json(); // { token }
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchWithAuth(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  return res;
}

//dashboard function.
export async function getDashboard(){
      const res = await fetchWithAuth(
         `${API_BASE_URL}/trades/all_history`
      );

      return res.json();
    }

//new trade function
export async function saveNewTrade(formdata){
  const res = await fetchWithAuth(
       `${API_BASE_URL}/trades/new_trade`,{
        method: "POST",
        body: JSON.stringify(formdata)
       });

     return res.json();  
  }

//running trades function
export async function getRunningTrades(){
  const res = await fetchWithAuth(
    `${API_BASE_URL}/trades/running`
  );
  
  return res.json();
}

//close trade function.
export async function closeTrade(tradeId,tradedata){
  const res = await fetchWithAuth(
    `${API_BASE_URL}/trades/${tradeId}/close`,{
      method: "POST",
      body:JSON.stringify(tradedata)
    }
  );

  return res.json();
}

//trade history function
export async function getTradeHistory(page,limit){
    const res = await fetchWithAuth(
      `${API_BASE_URL}/trades/history?page=${page}&limit=${limit}`
    );
    return res.json()
}

