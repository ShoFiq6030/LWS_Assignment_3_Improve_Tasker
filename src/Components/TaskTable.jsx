import React, { useState, useContext } from "react";
import TaskActions from "./TaskActions";
import TasksList from "./TasksList";

import AddTaskForm from "./AddTaskForm";
import { TaskContext } from "../context/context";

const TaskTable = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [taskUpdate, setTaskUpdate] = useState(null);
  const { state, dispatch } = useContext(TaskContext);

  const getNextId = (info) => {
    const maxId = info.reduce(
      (prev, current) => (prev && prev > current.id ? prev : current.id),
      0
    );
    return maxId + 1;
  };
  // handaler
  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      dispatch({
        type: "ADD_TASK",
        payload: {
          id: getNextId(state.taskData),
          title: newTask.title,
          description: newTask.description,
          tags: newTask.tags,
          priority: newTask.priority,
        },
      });
    } else {
      dispatch({
        type: "EDIT_TASK",
        payload: newTask,
      });
    }
  };

  const handleDelete = (taskId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (isConfirmed) {
      dispatch({
        type: "DELETE_TASK",
        payload: taskId,
      });
    }

  };
  const handleDeleteAllClick = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all task?"
    );
    if (isConfirmed) {
      dispatch({
        type: "DELETE_ALL_TASK",
      
      })
      
    }
  };
  const handleFavorite = (taskId) => {
    dispatch({
      type:"ADD_FAV",
      payload:taskId
    })
   
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleEditTask = (task) => {
    setTaskUpdate(task);
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
    setTaskUpdate(null);
  };

  return (
    <section className='mb-20" id="tasks'>
      <div className="container">
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onSearch={setSearch}
            onModalOpen={handleOpenModal}
            onDeleteAll={handleDeleteAllClick}
          />
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
              <div className="">
                <AddTaskForm
                  onClose={handleClose}
                  onAdd={handleAddEditTask}
                  taskUpdate={taskUpdate}
                />
              </div>
            </div>
          )}
          <TasksList
            search={search}
            tasks={state.taskData}
            onEdit={handleEditTask}
            onDelete={handleDelete}
            onFav={handleFavorite}
          />
        </div>
      </div>
    </section>
  );
};

export default TaskTable;
