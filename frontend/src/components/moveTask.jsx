import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { updateTask } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function MoveTask({ task }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const handleUpdate = async () => {
    try {
      const editTask = await updateTask(
        task.id,
        task.name,
        task.priority,
        status
      );
      Swal.fire({
        icon: "success",
        title: "Success...",
        text: "Task already move!",
      });
      navigate(0);
    } catch (error) {
      console.log("error updating task: ", error);
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded bg-gray-50 bg-opacity-75 px-4 py-2 text-sm font-medium">
          Move
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Move Task
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal"></Dialog.Description>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-violet11 w-[90px] text-right text-[15px]">
              Section
            </label>
            <select
              name="HeadlineAct"
              id="HeadlineAct"
              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="" disabled selected>
                Choose Section
              </option>
              <option value="to_do">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                onClick={handleUpdate}
              >
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
