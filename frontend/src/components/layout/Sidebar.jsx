import { Link } from "react-router-dom";


export default function Sidebar() {

  return (

    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">
        ServiceFlow AI
      </h1>


      <nav className="space-y-4">

        <Link
          to="/"
          className="block hover:bg-gray-800 px-4 py-3 rounded-lg"
        >
          Dashboard
        </Link>


        <Link
          to="/tickets"
          className="block hover:bg-gray-800 px-4 py-3 rounded-lg"
        >
          Tickets
        </Link>

      </nav>

    </div>
  );
}