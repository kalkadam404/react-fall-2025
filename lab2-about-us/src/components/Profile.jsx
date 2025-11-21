import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Calendar,
  Film,
  Heart,
  Star,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [tempData, setTempData] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    if (user) {
      const initial = {
        name: user.email || "User",
        email: user.email || "",
        bio: "Movie enthusiast...",
        joinDate: user.metadata?.creationTime || "N/A",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.email || "User"
        )}&size=200&background=3b82f6&color=fff`,
      };

      setUserData(initial);
      setTempData(initial);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1e2538] to-[#0f1419] flex items-center justify-center">
        <p className="text-white text-xl">Loading profile...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1e2538] to-[#0f1419] flex items-center justify-center">
        <p className="text-white text-xl">Loading profile...</p>
      </div>
    );
  }

  const stats = [
    { icon: <Film size={24} />, label: "Movies Watched", value: "127" },
    { icon: <Heart size={24} />, label: "Favorites", value: "23" },
    { icon: <Star size={24} />, label: "Average Rating", value: "4.2" },
  ];

  const recentMovies = [
    { title: "The Shawshank Redemption", year: "1994", rating: 5 },
    { title: "Inception", year: "2010", rating: 4.5 },
    { title: "Interstellar", year: "2014", rating: 5 },
    { title: "The Dark Knight", year: "2008", rating: 4.8 },
  ];

  const handleSave = () => {
    setUserData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(userData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e2538] to-[#0f1419] p-8 ">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-[#252d42] to-[#1e2538] rounded-2xl shadow-2xl p-8 mb-8 border border-gray-700/50">
          <div className="flex items-start justify-between">
            <div className="flex gap-6">
              {/* Avatar */}
              <div className="relative group">
                {userData && (
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-2xl border-4 border-blue-500/30 shadow-xl"
                  />
                )}
                {isEditing && (
                  <button className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit2 size={24} className="text-white" />
                  </button>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1">
                {!isEditing ? (
                  <>
                    <h1 className="text-4xl font-bold text-white mb-2">
                      {userData.name}
                    </h1>
                    <p className="text-gray-400 flex items-center gap-2 mb-3">
                      <Mail size={16} />
                      {userData.email}
                    </p>
                    <p className="text-gray-300 leading-relaxed max-w-2xl">
                      {userData.bio}
                    </p>
                    <p className="text-gray-500 flex items-center gap-2 mt-4">
                      <Calendar size={16} />
                      Member since {userData.joinDate}
                    </p>
                    {user && (
                      <p className="text-gray-500 flex items-center gap-2 mt-2">
                        <User size={16} />
                        UID: {user.uid}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={tempData.name}
                      onChange={(e) =>
                        setTempData({ ...tempData, name: e.target.value })
                      }
                      className="w-full bg-[#1e2538] text-white text-2xl font-bold px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="email"
                      value={tempData.email}
                      onChange={(e) =>
                        setTempData({ ...tempData, email: e.target.value })
                      }
                      className="w-full bg-[#1e2538] text-gray-300 px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                    <textarea
                      value={tempData.bio}
                      onChange={(e) =>
                        setTempData({ ...tempData, bio: e.target.value })
                      }
                      rows="3"
                      className="w-full bg-[#1e2538] text-gray-300 px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
                  >
                    <Edit2 size={18} />
                    Edit Profile
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
                  >
                    <X size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
                  >
                    <Save size={18} />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#252d42] to-[#1e2538] rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all hover:scale-105 shadow-xl"
            >
              <div className="text-blue-400 mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Movies */}
        <div className="bg-gradient-to-br from-[#252d42] to-[#1e2538] rounded-2xl shadow-2xl p-8 border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Film className="text-blue-400" size={28} />
            Recently Watched
          </h2>
          <div className="space-y-4">
            {recentMovies.map((movie, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#1e2538] p-4 rounded-xl hover:bg-[#252d42] transition-colors border border-gray-700/30"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{movie.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  <span className="text-white font-bold text-lg">
                    {movie.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
