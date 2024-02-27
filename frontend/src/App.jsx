import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import { LoginRoute } from "./utils/loginRoute";
import Register from "./pages/register";
import Navbar from "./components/navbar";
import HomePage from "./pages/homepage";
import BoardPage from "./pages/allBoard";
import Board from "./pages/board";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          {/* <Route path={"/test"} element={<MoveTask />} /> */}
          <Route
            path={"/homepage"}
            element={
              <>
                <LoginRoute>
                  <Navbar />
                  <HomePage />
                </LoginRoute>
              </>
            }
          />
          <Route
            path={"/all_board"}
            element={
              <>
                <LoginRoute>
                  <Navbar />
                  <BoardPage />
                </LoginRoute>
              </>
            }
          />
          <Route
            path={"/board/:id"}
            element={
              <>
                <LoginRoute>
                  <Navbar />
                  <Board />
                </LoginRoute>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
export default App;
