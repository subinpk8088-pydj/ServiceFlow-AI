import { useContext } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { AuthContext } from "./context/AuthContext";


function App() {

  const { user, loading } = useContext(AuthContext);


  if (loading) {

    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }


  return (
    <>
      {user ? <Dashboard /> : <Login />}
    </>
  );
}


export default App;