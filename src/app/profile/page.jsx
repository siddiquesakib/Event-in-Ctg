"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/AuthProvider";
import { ThemeContext } from "@/Context/ThemeProvider";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { user, updateUser } = useContext(AuthContext);
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    photoURL: "",
    phone: "",
    address: "",
    bio: "",
  });

  const t = {
    profile: "Profile",
    profileCompletion: "Profile Completion",
    edit: "Edit Profile",
    save: "Save Changes",
    cancel: "Cancel",
    name: "Name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    bio: "Bio",
    photoURL: "Photo URL",
    myEvents: "My Events",
    favorites: "Favorites",
    settings: "Settings",
    completeProfile: "Complete your profile to unlock all features!",
    loading: "Loading...",
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Load profile data from localStorage
    const savedProfile = JSON.parse(
      localStorage.getItem(`profile_${user.email}`) || "{}"
    );
    setProfileData({
      name: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
      phone: savedProfile.phone || "",
      address: savedProfile.address || "",
      bio: savedProfile.bio || "",
    });
  }, [user, router]);

  const calculateProfileCompletion = () => {
    const fields = ["name", "email", "photoURL", "phone", "address", "bio"];
    const completed = fields.filter((field) =>
      profileData[field]?.trim()
    ).length;
    return Math.round((completed / fields.length) * 100);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Update Firebase profile
      await updateUser({
        displayName: profileData.name,
        photoURL: profileData.photoURL,
      });

      // Save additional data to localStorage
      localStorage.setItem(
        `profile_${user.email}`,
        JSON.stringify({
          phone: profileData.phone,
          address: profileData.address,
          bio: profileData.bio,
        })
      );

      setEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  if (!user) {
    return null;
  }

  const completion = calculateProfileCompletion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t.profile}</h1>
        </div>

        {/* Profile Completion */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">{t.profileCompletion}</h2>
            <span className="text-2xl font-bold text-blue-400">
              {completion}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                completion === 100
                  ? "bg-gradient-to-r from-green-500 to-green-600"
                  : "bg-gradient-to-r from-blue-500 to-purple-600"
              }`}
              style={{ width: `${completion}%` }}
            ></div>
          </div>
          {completion < 100 && (
            <p className="text-sm text-gray-400 mt-3">{t.completeProfile}</p>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-gray-700">
          {/* Avatar Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="relative">
              <img
                src={profileData.photoURL || "/default-avatar.png"}
                alt={profileData.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />
              <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{profileData.name}</h2>
              <p className="text-gray-400 mb-4">{profileData.email}</p>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold"
                >
                  {t.edit}
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition font-semibold"
                  >
                    {t.save}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition font-semibold"
                  >
                    {t.cancel}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {t.name}
              </label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                disabled={!editing}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-60 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {t.email}
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                disabled
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg opacity-60 text-white cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {t.photoURL}
              </label>
              <input
                type="url"
                name="photoURL"
                value={profileData.photoURL}
                onChange={handleInputChange}
                disabled={!editing}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-60 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {t.phone}
              </label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                disabled={!editing}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-60 text-white"
                placeholder="+880 1234567890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {t.address}
              </label>
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                disabled={!editing}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-60 text-white"
                placeholder="Chittagong, Bangladesh"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {t.bio}
              </label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                disabled={!editing}
                rows={4}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-60 text-white"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
