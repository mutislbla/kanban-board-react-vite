import CircularProgress from "./progress";
import { getTaskByStatus } from "../utils/fetch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditBoard from "./editBoard";
import DeleteBoard from "./deleteBoard";
export default function BoardCard({ board }) {
  const navigate = useNavigate();
  const id = board.id;
  const [value, setValue] = useState(0);
  const countTask = board.task.length;
  useEffect(() => {
    const fetchCompletedTask = async () => {
      try {
        const completedTask = await getTaskByStatus(id, "completed");
        if (completedTask.tasks.length > 0) {
          setValue(completedTask.tasks.length);
        } else {
          setValue(0);
        }
      } catch (error) {
        console.error("Error fetching completed task:", error);
      }
    };
    fetchCompletedTask();
  }, [board]);
  const handleView = () => {
    navigate(`/board/${board.id}`);
  };
  return (
    <div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-8">
        <div className="rounded-lg bg-gray-200 flex items-center justify-center">
          <CircularProgress value={value} totalValue={board.task.length} />
        </div>
        <div className="rounded-lg bg-gray-200 lg:col-span-2 content-center p-3">
          <p className="font-semibold text-xl">{board.name}</p>
          <p>
            {countTask} {countTask > 1 ? "tasks" : "task"}
          </p>
        </div>
      </div>
      <div className="mt-4 flex gap-2 float-right">
        <button
          className="rounded bg-gray-50 bg-opacity-75 px-4 py-2 text-sm font-medium"
          onClick={handleView}
        >
          View
        </button>
        <EditBoard board={board} />

        <DeleteBoard board={board} />
      </div>
    </div>
  );
}
