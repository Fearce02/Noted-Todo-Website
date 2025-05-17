import axios from "axios";

const baseAPI = "http://localhost:5000";

function CompleteProfile({ user, onProfileCompletion }) {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const jwttoken = localStorage.getItem("token");
      if (!jwttoken)
        throw new Error("User not signed in please sign in to Continue");

      const response = await axios.patch(
        `${baseAPI}/auth/updateUser`,
        {
          firstName,
          lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        }
      );
      console.log("Profile Updated Succesfully");
      onProfileCompletion(response.data.updatedUser || null);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data.message || "Failed to Update Profile details"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Complete Your Profile</h2>
        <form onSubmit={handleSubmission} className="space-y-4">
          {error && <p className="text-red-600">{error}</p>}
          <div>
            <label className="block mb-1 text-sm font-medium">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={loading}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={loading}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </>
  );
}

export default CompleteProfile;
