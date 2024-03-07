import React, { useState } from "react";

const AddTaskForm = ({ onClose, onAdd, taskUpdate }) => {
  const [task, setTask] = useState(
    taskUpdate || {
      title: "",
      description: "",
      tags: [],
      priority: "",
      isFavorite: false,
    }
  );
  const [errors, setErrors] = useState({});

  const [isAdd, setIsAdd] = useState(Object.is(taskUpdate, null));

  const handleInputChange = (e) => {
    setErrors({});
    const name = e.target.name;
    let value = e.target.value;
    if (name === "tags") {
      value = value.split(",");
    }
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!task.title.trim()) {
      validationErrors.title = "Title is required";
    }
    if (!task.description.trim()) {
      validationErrors.description = "Description is required";
    }
    if (task.tags.length === 0) {
      validationErrors.tags = "Tags are required";
    }
    if (!task.priority.trim()) {
      validationErrors.priority = "Priority is required";
    }

    if (Object.keys(validationErrors).length === 0) {
      onAdd(task, isAdd);
      onClose();
      
    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <div>
      <form className="mx-auto my-10 max-h-full w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11">
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          {isAdd ? "Add New Task" : "Edit Task"}
        </h2>

        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              id="title"
              value={task.title}
              onChange={handleInputChange}
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[80px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              id="description"
              required=""
              value={task.description}
              onChange={handleInputChange}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags(comma-separated)</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                id="tags"
                value={task.tags}
                onChange={handleInputChange}
              />
              {errors.tags && <p className="text-red-500">{errors.tags}</p>}
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                id="priority"
                value={task.priority}
                onChange={handleInputChange}
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {errors.priority && (
                <p className="text-red-500">{errors.priority}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center lg:mt-10">
          <button
            type="submit"
            className="rounded bg-blue-600 px-3.5 py-2.5 text-white transition-all hover:opacity-80"
            onClick={handleSubmit}
          >
            {isAdd ? "Create new Task" : "Update Task"}
          </button>
          <button
            onClick={onClose}
            className="rounded bg-red-600 px-3.5 py-2.5 ml-2  text-white transition-all hover:opacity-80"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
