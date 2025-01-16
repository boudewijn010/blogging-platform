import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Settings() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("********");
  const [theme, setTheme] = useState("light");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (session) {
      setUsername(session.user.name);
    }
  }, [session]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSave = async (e) => {
    e.preventDefault();
    // Add logic to save the updated username and password
    console.log("Updated Username:", username);
    console.log("Updated Password:", password);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // Add logic to change the password
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm New Password:", confirmNewPassword);
    setShowPasswordModal(false);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl mb-4">
          You need to be signed in to access the settings
        </h1>
        <button
          onClick={() => signIn()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Settings
      </h1>
      <form
        onSubmit={handleSave}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Password
          </label>
          <div className="flex items-center">
            <input
              type="password"
              id="password"
              value={password}
              readOnly
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-300"
            />
            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Change
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="theme"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Theme
          </label>
          <select
            id="theme"
            value={theme}
            onChange={handleThemeChange}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-300"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Change Password
            </h2>
            <form onSubmit={handleChangePassword}>
              <div className="mb-4">
                <label
                  htmlFor="oldPassword"
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmNewPassword"
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
