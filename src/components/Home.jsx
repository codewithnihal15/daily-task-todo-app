import React, { useEffect, useState } from "react";
import Task from "./task";

const Home = () => {
  const initialArr = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  const [tasks, setTasks] = useState(initialArr);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // console.log(title, description);

  const submitHandler = (e) => {
    e.preventDefault(); //this prevent form from ? submit

    //In setting task we apply spread operator and add an object with it.
    setTasks([...tasks, { title, description }]);
    setTitle("");
    setDescription("");
  };

  const deleteTask = (index) => {
    const filteredArr = tasks.filter((val, i) => {
      return i !== index;
    });
    setTasks(filteredArr);
  };
  //to store our data on localstorage we use "useEffect"
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); //"key" ,stringify means to change obj into string
  }, [tasks]);

  return (
    <div className="container">
      <h1>My Daily Goals</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">ADD</button>
      </form>
      {/* in react when we use map we must have to define unique key */}
      {tasks.map((item, index) => (
        <Task
          key={index}
          title={item.title}
          description={item.description}
          deleteTask={deleteTask}
          index={index}
        />
      ))}
    </div>
  );
};

export default Home;
