import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm bg-blue-900 p-1 rounded-md font-medium text-slate-300 hover:text-red-800 hover:bg-white transition"
    >
      Logout
    </button>
  );
}
