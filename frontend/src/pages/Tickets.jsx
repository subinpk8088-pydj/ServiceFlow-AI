import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import {
  fetchTickets,
  createTicket,
  updateTicketStatus,
} from "../api/tickets";


export default function Tickets() {

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


  // UPDATE STATUS

  const handleStatusChange = async (
    ticketId,
    newStatus
  ) => {

    try {

      const updatedTicket =
        await updateTicketStatus(
          ticketId,
          {
            status: newStatus,
          }
        );


      setTickets(
        tickets.map((ticket) =>

          ticket.id === ticketId
            ? updatedTicket
            : ticket
        )
      );

    } catch (error) {

      console.log(error);

      alert("Failed to update status");
    }
  };


  if (loading) {

    return (
      <div className="h-screen flex items-center justify-center">
        Loading Tickets...
      </div>
    );
  }


  return (

    <MainLayout>

      {/* PAGE HEADER */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Ticket Management
          </h1>

          <p className="text-gray-500 mt-2">
            Create and manage all support tickets
          </p>

        </div>


        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >
          Create Ticket
        </button>

      </div>


      {/* TICKETS TABLE */}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left py-4 px-6 text-gray-600">
                  Ticket
                </th>

                <th className="text-left py-4 px-6 text-gray-600">
                  Priority
                </th>

                <th className="text-left py-4 px-6 text-gray-600">
                  Status
                </th>

                <th className="text-left py-4 px-6 text-gray-600">
                  Created By
                </th>

                <th className="text-left py-4 px-6 text-gray-600">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {tickets.length > 0 ? (

                tickets.map((ticket) => (

                  <tr
                    key={ticket.id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    <td className="py-5 px-6">

                      <h3 className="font-semibold text-gray-800">
                        {ticket.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {ticket.description}
                      </p>

                    </td>


                    <td className="py-5 px-6">

                      <span
                        className={`
                          px-3 py-1 rounded-full text-sm font-medium
                          ${ticket.priority === "HIGH"
                            ? "bg-red-100 text-red-600"
                            : ticket.priority === "MEDIUM"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                          }
                        `}
                      >
                        {ticket.priority}
                      </span>

                    </td>


                    <td className="py-5 px-6">

                      <span
                        className={`
                          px-3 py-1 rounded-full text-sm font-medium
                          ${ticket.status === "OPEN"
                            ? "bg-yellow-100 text-yellow-600"
                            : ticket.status === "IN_PROGRESS"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-green-100 text-green-600"
                          }
                        `}
                      >
                        {ticket.status}
                      </span>

                    </td>


                    <td className="py-5 px-6 text-gray-700">
                      {ticket.created_by_name}
                    </td>


                    <td className="py-5 px-6">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleStatusChange(
                              ticket.id,
                              "IN_PROGRESS"
                            )
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Start
                        </button>


                        <button
                          onClick={() =>
                            handleStatusChange(
                              ticket.id,
                              "RESOLVED"
                            )
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Resolve
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="py-10 text-center text-gray-500"
                  >
                    No tickets available
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* CREATE TICKET MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl">

            <h2 className="text-2xl font-bold mb-6">
              Create New Ticket
            </h2>


            <form onSubmit={handleCreateTicket}>

              <input
                type="text"
                name="title"
                placeholder="Ticket title"
                className="w-full border p-3 rounded-lg mb-4"
                onChange={handleChange}
                value={formData.title}
                required
              />


              <textarea
                name="description"
                placeholder="Describe the issue..."
                className="w-full border p-3 rounded-lg mb-4"
                rows="5"
                onChange={handleChange}
                value={formData.description}
                required
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
                  className="px-5 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Create Ticket
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </MainLayout>
  );
}