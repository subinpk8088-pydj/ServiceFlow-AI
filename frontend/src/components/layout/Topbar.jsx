import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";


export default function Topbar() {

  const { user, logoutUser } = useContext(AuthContext);


  return (

    <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">

      <div>

        <h2 className="text-2xl font-bold">
          Welcome back
        </h2>

        <p className="text-gray-500">
          Manage your services efficiently
        </p>

      </div>


      <div className="flex items-center gap-4">

        <div className="text-right">

          <h3 className="font-semibold">
            {user?.username}
          </h3>

          <p className="text-sm text-gray-500">
            {user?.role}
          </p>

        </div>


        <button
          onClick={logoutUser}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>
  );
}