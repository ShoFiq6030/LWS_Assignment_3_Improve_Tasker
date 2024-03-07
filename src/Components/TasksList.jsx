import React from "react";
import Task from "./Task";

const TasksList = ({ search, tasks, onEdit, onDelete,onFav }) => {
  const filteredData = tasks.filter((item) => {
    return search.toLowerCase() === ""
      ? true
      : item.title.toLowerCase().includes(search);
  });
  // console.log(filteredData)
  return (
    <div>
      <div className="overflow-auto">
        <table className="table-fixed overflow-auto xl:w-full">
          <thead>
            <tr>
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]" />
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
                Title
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
                Description
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
                Tags
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                Priority
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                Options
              </th>
            </tr>
          </thead>
          {filteredData.length === 0 ? (
            <tbody>
              <tr>
                <td className="text-center" colSpan="6">
                  No data
                </td>
              </tr>
            </tbody>
          ) : (
            filteredData.map((item) => (
              <Task
                key={item.id}
                list={item}
                onEdit={onEdit}
                onDelete={onDelete}
              onFav={onFav}
              />
            ))
          )}
        </table>
      </div>
    </div>
  );
};

export default TasksList;
