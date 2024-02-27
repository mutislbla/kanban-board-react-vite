import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Log out Successfully!",
    }).then(() => {
      Cookies.remove("token");
      navigate("/");
    });
  };
  return (
    <header className="bg-gray-100 py-5 fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="block text-red-600" href="/homepage">
              <span className="sr-only">Home</span>
              <p className="text-3xl font-bold">Kanban Board</p>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <div className="sm:flex sm:gap-4">
                <button
                  className="block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            </div>
            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
