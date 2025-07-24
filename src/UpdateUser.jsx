"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users/" + id);
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setName(result.name);
          setEmail(result.email);
          setAge(result.age);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [id]);

  const Update = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, age }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white text-center">
              Update User
            </h2>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={Update} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Update User
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="text-gray-600 hover:text-gray-800 font-medium transition duration-200"
                >
                  ← Back to Users
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
