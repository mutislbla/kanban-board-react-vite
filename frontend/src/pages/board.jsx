import { useParams, useNavigate } from "react-router-dom";
import TaskCard from "../components/taskCard";
import { getUser, getBoardById, getTaskByStatus } from "../utils/fetch";
import { useState, useEffect } from "react";
import AddTask from "../components/addTask";
export default function Board() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userId, setUserId] = useState(0);
  const [boardUserId, setBoardUserId] = useState(0);
  const [boards, setBoards] = useState([]);
  const [todoTask, setTodoTask] = useState([]);
  const [inProgressTask, setInProgressTask] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const user = await getUser();
        setUserId(user.user.id);
        const board = await getBoardById(id);
        if (board.boards == null) {
          return navigate("/all_board");
        }
        setBoardUserId(board.boards.user_id);
        setBoards(board.boards);
        if (board.boards.user_id !== user.user.id || !board) {
          return navigate("/all_board");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchBoard();
  }, [id]);

  useEffect(() => {
    const fetchTodoTask = async () => {
      try {
        const todoTasks = await getTaskByStatus(id, "to_do");
        setTodoTask(todoTasks.tasks);
      } catch (error) {
        console.error("Error fetching todo task:", error);
      }
    };
    fetchTodoTask();
  }, [id]);

  useEffect(() => {
    const fetchProgressTask = async () => {
      try {
        const progressTasks = await getTaskByStatus(id, "in_progress");
        setInProgressTask(progressTasks.tasks);
      } catch (error) {
        console.error("Error fetching progress task:", error);
      }
    };
    fetchProgressTask();
  }, [id]);

  useEffect(() => {
    const fetchCompletedTask = async () => {
      try {
        const completedTasks = await getTaskByStatus(id, "completed");
        setCompletedTask(completedTasks.tasks);
      } catch (error) {
        console.error("Error fetching completed task:", error);
      }
    };
    fetchCompletedTask();
  }, [id]);
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-24">
        <div className="flow-root">
          <p className="float-left">
            <h1 className="text-2xl font-bold md:tracki md:text-3xl ml-5 m-10">
              {boards.name}
            </h1>
          </p>
          <p className="float-right">
            <AddTask board={boards} />
          </p>
        </div>
        <div className="grid grid-cols gap-3 md:grid-cols-3 md:gap-8 lg:grid-cols-3 lg:gap-8">
          <div className="rounded-lg bg-gray-200 p-3 m-3">
            <p className="font-bold text-2xl text-center my-5">TO DO</p>
            {Array.isArray(todoTask) && todoTask.length > 0 ? (
              todoTask.map((task) => (
                <div className="pb-5">
                  <TaskCard task={task} />
                </div>
              ))
            ) : (
              <p className="text-center font-semibold my-10">
                No task available.
              </p>
            )}
          </div>
          <div className="rounded-lg bg-gray-200 p-3 m-3">
            <p className="font-bold text-2xl text-center my-5">IN PROGRESS</p>
            {Array.isArray(inProgressTask) && inProgressTask.length > 0 ? (
              inProgressTask.map((task) => (
                <div className="pb-5">
                  <TaskCard task={task} />
                </div>
              ))
            ) : (
              <p className="text-center font-semibold my-10">
                No task available.
              </p>
            )}
          </div>
          <div className="rounded-lg bg-gray-200 p-3 m-3">
            <p className="font-bold text-2xl text-center my-5">COMPLETED</p>
            {Array.isArray(completedTask) && completedTask.length > 0 ? (
              completedTask.map((task) => (
                <div className="pb-5">
                  <TaskCard task={task} />
                </div>
              ))
            ) : (
              <p className="text-center font-semibold my-10">
                No task available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
