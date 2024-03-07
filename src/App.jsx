import { useState,useReducer } from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import Nav from "./Nav";
import TaskTable from "./Components/TaskTable";
import { TaskContext } from "./context/context";
import { initialState, taskReducer } from "./taskReducers/taskReducers";



const App = () => {

  const[state,dispatch]=useReducer(taskReducer,initialState)
  return ( 
    <TaskContext.Provider value={{state,dispatch}} >
      <div className="bg-[#191D26] font-[Inter] text-white">
        <Nav />
        <div className="flex flex-col items-center">
          <Hero />
          <TaskTable />
        </div>
        <Footer />
      </div>
    </TaskContext.Provider>
  );
};

export default App;
