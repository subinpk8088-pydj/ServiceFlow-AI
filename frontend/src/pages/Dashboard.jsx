import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import { fetchTickets } from "../api/tickets";


export default function Dashboard() {

  const [tickets, setTickets] = useState([]);

  const [loading, setLoading] = useState(true);


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

    <MainLayout>

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor service performance and ticket activity
        </p>

      </div>


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


      {/* RECENT ACTIVITY */}

      <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Recent Activity
        </h2>


        <div className="space-y-4">

          {tickets.slice(0, 5).map((ticket) => (

            <div
              key={ticket.id}
              className="flex justify-between items-center border-b pb-4"
            >

              <div>

                <h3 className="font-semibold">
                  {ticket.title}
                </h3>

                <p className="text-sm text-gray-500">
                  Created by {ticket.created_by_name}
                </p>

              </div>


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

            </div>

          ))}

        </div>

      </div>

    </MainLayout>
  );
}