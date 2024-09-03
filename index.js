const express = require("express");
const fs = require("fs");
const path = "todos.json";

const app = express();

app.get("/todo-list", (req, res) => {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log("err", err);
      res.send("Data not available");
    } else {
      let jsonArray = JSON.parse(data);
      res.send(jsonArray);
    }
  });
});

app.post("/todo-add", (req, res) => {
  const todo = req.query.todo;
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      res.send("error");
    } else {
      let jsonArray = JSON.parse(data);
      const newTodo = {
        id: Date.now().toString().slice(-2),
        description: todo,
      };
      jsonArray.push(newTodo);
      fs.writeFile(path, JSON.stringify(jsonArray, null, 2), (err) => {
        if (err) {
          console.log("err", err);
          res.send("Not bale to add the todo");
        }
      });
      res.send("Todo successfully added");
    }
  });
});

app.delete("/todo-delete", (req, res) => {
  const deletTodoId = req.query.id;
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
    } else {
      let jsonArray = JSON.parse(data);
      const newArray = jsonArray.filter((item) => item.id != deletTodoId);
      fs.writeFile(path, JSON.stringify(newArray, null, 2), (err) => {});
      res.send("Todo deleted successfully");
    }
  });
});

app.patch("/todo-edit", (req, res) => {
  const editTodoId = req.query.id;
  const editTodoText = req.query.todo;
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log("err", err);
    } else {
      const jsonArray = JSON.parse(data);
      const currItem = jsonArray.find((item) => item.id == editTodoId);
      currItem.description = editTodoText;
      fs.writeFile(path, JSON.stringify(jsonArray, null, 2), (err) => {
        if (err) {
          console.log("err", err);
        } else {
          res.send("Todo edited successfully");
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log("The server is up and running on port 3000");
});
