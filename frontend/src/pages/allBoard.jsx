import BoardCard from "../components/boardCard";
import { useEffect, useState } from "react";
import { getAllBoards } from "../utils/fetch";
import AddBoard from "../components/addBoard";
export default function AllBoardPage() {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const board = await getAllBoards();
        setBoards(board.boards);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchBoard();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-24">
        <h1 className="text-2xl font-bold md:tracki md:text-3xl ml-5 m-10">
          All Boards
        </h1>
        <div class="grid grid-cols gap-3 md:grid-cols-3 md:gap-8 lg:grid-cols-3 lg:gap-8">
          {Array.isArray(boards) && boards.length > 0 ? (
            boards.map((board) => (
              <div class="rounded-lg bg-gray-200 p-3 m-3">
                <BoardCard board={board} />
              </div>
            ))
          ) : (
            <></>
          )}
          <AddBoard />
        </div>
      </div>
    </div>
  );
}
