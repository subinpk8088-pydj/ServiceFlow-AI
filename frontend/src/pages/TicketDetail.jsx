import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import axiosInstance from "../api/axios";

import { getAuthHeaders } from "../api/tickets";


export default function TicketDetail() {

  const { id } = useParams();

  const [ticket, setTicket] = useState(null);

  const [loading, setLoading] = useState(true);


  const fetchTicketDetail = async () => {

    try {

      const response = await axiosInstance.get(
        `tickets/${id}/`,
        getAuthHeaders()
      );

      setTicket(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    fetchTicketDetail();

  }, []);


  if (loading) {

    return (
      <div className="h-screen flex items-center justify-center">
        Loading Ticket...
      </div>
    );
  }


  if (!ticket) {

    return (
      <div className="h-screen flex items-center justify-center">
        Ticket not found
      </div>
    );
  }


  return (

    <MainLayout>

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">

          <div className="flex justify-between items-start">

            <div>

              <h1 className="text-3xl font-bold text-gray-800">
                {ticket.title}
              </h1>

              <p className="text-gray-500 mt-3">
                {ticket.description}
              </p>

            </div>


            <span
              className={`
                px-4 py-2 rounded-full text-sm font-medium
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

        </div>


        {/* DETAILS GRID */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow-sm p-6">

            <h3 className="text-gray-500 mb-2">
              Priority
            </h3>

            <h2 className="text-2xl font-bold">
              {ticket.priority}
            </h2>

          </div>


          <div className="bg-white rounded-2xl shadow-sm p-6">

            <h3 className="text-gray-500 mb-2">
              Created By
            </h3>

            <h2 className="text-2xl font-bold">
              {ticket.created_by_name}
            </h2>

          </div>


          <div className="bg-white rounded-2xl shadow-sm p-6">

            <h3 className="text-gray-500 mb-2">
              Ticket ID
            </h3>

            <h2 className="text-2xl font-bold">
              #{ticket.id}
            </h2>

          </div>

        </div>


        {/* ACTIVITY */}

        <div className="bg-white rounded-2xl shadow-sm p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Activity Timeline
          </h2>


          <div className="border-l-2 border-blue-200 pl-6 space-y-6">

            <div>

              <h3 className="font-semibold">
                Ticket Created
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                Created by {ticket.created_by_name}
              </p>

            </div>


            <div>

              <h3 className="font-semibold">
                Current Status
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {ticket.status}
              </p>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}