import EditTask from "./editTask";
import MoveTask from "./moveTask";
import DeleteTask from "./deleteTask";
export default function TaskCard({ task }) {
  const getColorPriority = () => {
    if (task.priority === "Urgent") {
      return "rounded-lg p-8 shadow-2xl bg-red-400 hover:bg-red-500 my-4";
    } else if (task.priority === "Medium") {
      return "rounded-lg p-8 shadow-2xl bg-yellow-400 hover:bg-yellow-500 my-4";
    } else {
      return "rounded-lg p-8 shadow-2xl bg-green-400 hover:bg-green-500 my-4";
    }
  };
  return (
    <div className={getColorPriority()}>
      <h2 className="text-lg font-bold">{task.name}</h2>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-7">
        <EditTask task={task} />
        <MoveTask task={task} />
        <DeleteTask task={task} />
      </div>
      
    </div>
  );
}
