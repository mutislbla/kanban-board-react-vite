const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { PrismaClient, Status } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

function authenticateTokenMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = user.userId;
  next();
}

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    optionsSuccessStatus: 200,
  })
);

// register
app.post("/register", async (req, res) => {
  const { full_name, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const { password: passwordDB, ...user } = await prisma.user.create({
      data: {
        full_name,
        username,
        email,
        password: hashedPassword,
      },
    });
    res.json({ user });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong!" });
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid credentials" });
  }
});

// get user
app.get("/user", authenticateTokenMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.userId) },
      select: {
        id: true,
        username: true,
        full_name: true,
      },
    });
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: { e } });
  }
});

// get all board
app.get("/board", authenticateTokenMiddleware, async (req, res) => {
  const boards = await prisma.board.findMany({
    where: { user_id: req.userId },
    orderBy: {
      created_at: "desc",
    },
    include: {
      task: true,
    },
  });
  res.json({ boards });
});

// get board by id
app.get("/board/:id", authenticateTokenMiddleware, async (req, res) => {
  const boards = await prisma.board.findUnique({
    where: { id: parseInt(req.params.id) },
    include: {
      task: true,
    },
  });
  res.json({ boards });
});

// create board
app.post("/board", authenticateTokenMiddleware, async (req, res) => {
  const { name } = req.body;
  try {
    const newBoard = await prisma.board.create({
      data: {
        user_id: req.userId,
        name: name,
      },
    });
    res.json({ newBoard });
  } catch (err) {
    console.log("Error creating board : ", err);
    res.status(400).json({ message: "Board creation failed" });
  }
});

// update board
app.put("/board/:id", authenticateTokenMiddleware, async (req, res) => {
  try {
    const updateBoard = await prisma.board.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name: req.body.name,
      },
    });
    res.json({ updateBoard });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// delete board
app.delete("/board/:id", authenticateTokenMiddleware, async (req, res) => {
  try {
    const board = await prisma.board.delete({
      where: { id: parseInt(req.params.id) },
      include: { task: true },
    });
    res.json({ message: "deleted", board });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// get task by status
app.get("/task/:id/:status", authenticateTokenMiddleware, async (req, res) => {
  const { id, status } = req.params;
  const tasks = await prisma.task.findMany({
    where: { board_id: parseInt(id), status: status },
    orderBy: {
      priority: "desc",
    },
  });
  res.json({ tasks });
});

// count completed tasks
app.get("/complete_task", authenticateTokenMiddleware, async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { status: "completed" },
  });
  res.json({ tasks });
});

// create task
app.post("/task/:id", authenticateTokenMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, priority, status } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        board_id: parseInt(id),
        name,
        priority,
        status,
      },
    });
    res.json({ newTask });
  } catch (err) {
    console.log("Error creating task : ", err);
    res.status(400).json({ message: "Task creation failed" });
  }
});

// update task
app.put("/task/:id", authenticateTokenMiddleware, async (req, res) => {
  try {
    const { name, priority, status } = req.body;
    const updateTask = await prisma.task.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        priority,
        status,
      },
    });
    res.json({ updateTask });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// delete task
app.delete("/task/:id", authenticateTokenMiddleware, async (req, res) => {
  try {
    const task = await prisma.task.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "deleted", task });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
