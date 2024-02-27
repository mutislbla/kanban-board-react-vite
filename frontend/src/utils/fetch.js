import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:3000/login", {
      email,
      password,
    });
    if (!response.data.token) {
      throw new Error("Login failed");
    }
    const token = response.data.token;
    Cookies.set("token", token);
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: `username and password didnt match`,
    });
  }
};

export const register = async (full_name, username, email, password) => {
  try {
    const response = await axios.post("http://localhost:3000/register", {
      full_name,
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error register: ${error}`,
    });
  }
};

export const getUser = async () => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get("http://localhost:3000/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching user: ${error}`,
    });
  }
};

export const getAllBoards = async () => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get("http://localhost:3000/board", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching board: ${error}`,
    });
  }
};

export const getBoardById = async (id) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(`http://localhost:3000/board/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching board: ${error}`,
    });
  }
};

export const createBoard = async (name) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      `http://localhost:3000/board/`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Create Board Successfully!",
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error while creating board: ${error}`,
    });
  }
};

export const updateBoard = async (id, name) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.put(
      `http://localhost:3000/board/${id}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Update Board Successfully!",
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error update board: ${error}`,
    });
  }
};

export const deleteBoard = async (id) => {
  const token = Cookies.get("token");
  try {
    const token = Cookies.get("token");
    const response = await axios.delete(`http://localhost:3000/board/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Delete Board Successfully!",
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error delete board: ${error}`,
    });
  }
};

export const getTaskByStatus = async (id, status) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(
      `http://localhost:3000/task/${id}/${status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching board: ${error}`,
    });
  }
};

export const createTask = async (board_id, name, priority, status) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      `http://localhost:3000/task/${board_id}`,
      { name, priority, status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Create task Successfully!",
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error while creating task: ${error}`,
    });
  }
};

export const updateTask = async (id, name, priority, status) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.put(
      `http://localhost:3000/task/${id}`,
      { name, priority, status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "update Board Successfully!",
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error update board: ${error}`,
    });
  }
};

export const updateStatusTask = async (id, name, priority, status) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.put(
      `http://localhost:3000/task/${id}`,
      { name, priority, status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "update Board Successfully!",
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error update board: ${error}`,
    });
  }
};

export const deleteTask = async (id) => {
  const token = Cookies.get("token");
  try {
    const token = Cookies.get("token");
    const response = await axios.delete(`http://localhost:3000/task/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Delete Task Successfully!",
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error delete task: ${error}`,
    });
  }
};
