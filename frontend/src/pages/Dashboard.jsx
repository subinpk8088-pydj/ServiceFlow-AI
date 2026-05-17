import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";

import {
  fetchTickets,
  createTicket,
} from "../api/tickets";


export default function Dashboard() {

  const { user, logoutUser } = useContext(AuthContext);

  const [tickets, setTickets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
  });


  // FETCH TICKETS

  const loadTickets = async () => {

    try {

      const data = await fetchTickets();

      setTickets(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    loadTickets();

  }, []);


  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // CREATE TICKET

  const handleCreateTicket = async (e) => {

    e.preventDefault();

    try {

      const newTicket = await createTicket(
        formData
      );

      setTickets([
        newTicket,
        ...tickets,
      ]);

      setShowModal(false);

      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
      });

    } catch (error) {

      console.log(error);

      alert("Failed to create ticket");
    }
  };


  // STATS

  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    ticket => ticket.status === "OPEN"
  ).length;

  const resolvedTickets = tickets.filter(
    ticket => ticket.status === "RESOLVED"
  ).length;


  if (loading) {

    return (
      <div className="h-screen flex items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }


  return (

    <div className="min-h-screen bg-gray-100">

      {/* TOPBAR */}

      <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold text-gray-800">
            ServiceFlow AI
          </h1>

          <p className="text-sm text-gray-500">
            Smart Service Management Platform
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


      {/* CONTENT */}

      <div className="p-8">

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow-sm p-6">

            <h3 className="text-gray-500 mb-2">
              Total Tickets
            </h3>

            <h1 className="text-4xl font-bold">
              {totalTickets}
            </h1>

          </div>


          <div className="bg-white rounded-2xl shadow-sm p-6">

            <h3 className="text-gray-500 mb-2">
              Open Tickets
            </h3>

            <h1 className="text-4xl font-bold text-yellow-500">
              {openTickets}
            </h1>

          </div>


          <div className="bg-white rounded-2xl shadow-sm p-6">

            <h3 className="text-gray-500 mb-2">
              Resolved Tickets
            </h3>

            <h1 className="text-4xl font-bold text-green-500">
              {resolvedTickets}
            </h1>

          </div>

        </div>


        {/* TICKETS */}

        <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
              Recent Tickets
            </h2>

            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Create Ticket
            </button>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4">
                    Title
                  </th>

                  <th className="text-left py-4">
                    Priority
                  </th>

                  <th className="text-left py-4">
                    Status
                  </th>

                  <th className="text-left py-4">
                    Created By
                  </th>

                </tr>

              </thead>


              <tbody>

                {tickets.map((ticket) => (

                  <tr
                    key={ticket.id}
                    className="border-b"
                  >

                    <td className="py-4">
                      {ticket.title}
                    </td>

                    <td className="py-4">

                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                        {ticket.priority}
                      </span>

                    </td>

                    <td className="py-4">

                      <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                        {ticket.status}
                      </span>

                    </td>

                    <td className="py-4">
                      {ticket.created_by_name}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>


      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-2xl p-8 w-full max-w-lg">

            <h2 className="text-2xl font-bold mb-6">
              Create Ticket
            </h2>


            <form onSubmit={handleCreateTicket}>

              <input
                type="text"
                name="title"
                placeholder="Ticket title"
                className="w-full border p-3 rounded-lg mb-4"
                onChange={handleChange}
                value={formData.title}
              />


              <textarea
                name="description"
                placeholder="Describe issue..."
                className="w-full border p-3 rounded-lg mb-4"
                rows="5"
                onChange={handleChange}
                value={formData.description}
              />


              <select
                name="priority"
                className="w-full border p-3 rounded-lg mb-6"
                onChange={handleChange}
                value={formData.priority}
              >

                <option value="LOW">
                  LOW
                </option>

                <option value="MEDIUM">
                  MEDIUM
                </option>

                <option value="HIGH">
                  HIGH
                </option>

              </select>


              <div className="flex justify-end gap-4">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 border rounded-lg"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Create
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}