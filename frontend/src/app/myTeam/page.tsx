"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const TeamsPage = () => {
  const { data: session } = useSession();
  const [teammates, setTeammates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teammateEmail, setTeammateEmail] = useState("");

  // Fetch teammates on component load
  useEffect(() => {
    const fetchTeammates = async () => {
      try {
        const userEmail = localStorage.getItem("email");
        const response = await fetch("/api/getTeammate", {
          method: "GET",
          headers: {
            "user-email": userEmail,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch teammates");
        }

        const teammatesData = await response.json();

        // Fetch usernames for teammates
        const teammatesWithUsernames = await Promise.all(
          teammatesData.map(async (teammate) => {
            try {
              const usernameResponse = await fetch("/api/getUsername", {
                method: "GET",
                headers: {
                  "user-email": teammate.teammateEmail,
                },
              });

              if (!usernameResponse.ok) {
                throw new Error("Failed to fetch username");
              }

              const usernameData = await usernameResponse.json();
              return {
                ...teammate,
                username: usernameData.username, // Add username to the teammate object
              };
            } catch (error) {
              console.error("Error fetching username:", error);
              return { ...teammate, username: "Unknown" }; // Fallback for failed username fetch
            }
          })
        );

        setTeammates(teammatesWithUsernames);
      } catch (error) {
        console.error("Error fetching teammates:", error);
      }
    };

    fetchTeammates();
  }, []);

  // Add a new teammate
  const handleAddTeammate = async () => {
    try {
      const userEmail = localStorage.getItem("email");
      const response = await fetch("/api/addTeammate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-email": userEmail,
        },
        body: JSON.stringify({ teammateEmail }),
      });

      if (!response.ok) {
        throw new Error("Email Does Not Exist");
      }

      const data = await response.json();
      setTeammates((prevTeammates) => [...prevTeammates, data]);
      setIsModalOpen(false);
      setTeammateEmail("");
    } catch (error) {
      alert(error.message); // Display error message to the user
      console.error("Error adding teammate:", error);
    }
  };

  // Delete a teammate
  const handleDeleteTeammate = async (teammateEmail: string) => {
    try {
      const userEmail = localStorage.getItem("email");

      // Send the DELETE request to the API
      const response = await fetch(`/api/deleteTeammate`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "user-email": userEmail!,
          "teammate-email": teammateEmail, // Pass teammate email as header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete teammate");
      }

      // If the delete is successful, remove the teammate from state
      setTeammates((prevTeammates) =>
        prevTeammates.filter((teammate) => teammate.teammateEmail !== teammateEmail)
      );
    } catch (error) {
      alert(error.message); // Display error message to the user
      console.error("Error deleting teammate:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-500">Team Members</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Teammate
        </button>
      </div>

      {/* Teammates List */}
      <div className="mt-6">
        {teammates.length > 0 ? (
          <ul className="space-y-2">
            {teammates.map((teammate, index) => (
              <li
                key={index}
                className="p-4 border border-gray-300 rounded shadow-md flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Email:</strong> {teammate.teammateEmail}
                  </p>
                  <p>
                    <strong>Username:</strong> {teammate.username}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteTeammate(teammate.teammateEmail)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No teammates added yet.</p>
        )}
      </div>

      {/* Modal for Adding Teammate */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Teammate</h2>
            <input
              type="email"
              placeholder="Enter teammate's email"
              value={teammateEmail}
              onChange={(e) => setTeammateEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTeammate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
