"use client";

import { AuthContext } from "@/Context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Page() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const router = useRouter();

  // Load events for this user
  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!user?.email) return;

    const loadData = async () => {
      try {
        const res = await fetch(
          `https://event-in-ctg-server.vercel.app/events?email=${user.email}`
        );
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load events");
      }
    };

    loadData();
  }, [user?.email]);

  //delete mathod

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://event-in-ctg-server.vercel.app/events/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            res.json();
          })
          .then((data) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });

            const filterdata = events.filter((data) => data._id !== id);
            setEvents(filterdata);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Manage Your Events</h1>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative w-full h-48">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => router.push(`/events/${item._id}`)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
