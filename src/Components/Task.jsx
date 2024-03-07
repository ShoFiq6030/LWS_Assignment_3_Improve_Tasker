import React from "react";
import { GoStarFill } from "react-icons/go";

const Task = ({ list, onEdit, onDelete, onFav }) => {
  // console.log(list);
  const getRandomColor = (staticColors) => {
    if (staticColors && staticColors.length > 0) {
      // Randomly choose a color from the staticColors array
      const randomIndex = Math.floor(Math.random() * staticColors.length);
      return staticColors[randomIndex];
    } else {
      console.log("No static colors provided.");
      return null;
    }
  };

  const staticColors = [
    "#FF0000",
    "#4F7407",
    "#0000FF",
    "#BB3417",
    "#F14277",
    "#C742F1",
  ];
  const randomColor = getRandomColor(staticColors);

  const { title, description, tags, priority, isFavorite } = list || {};
  return (
    <tbody>
      <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
        <td>
          <button onClick={() => onFav(list.id)}>
            {isFavorite ? (
              <GoStarFill color="yellow" size={24} />
            ) : (
              <GoStarFill color="gray" size={24} />
            )}
          </button>
        </td>
        <td>{title}</td>
        <td>
          <div>{description}</div>
        </td>
        <td>
          <ul className="flex justify-center gap-1.5 flex-wrap">
            {/* {console.log(tags)} */}
            {tags.map((tag) => (
              <li key={tag}>
                <span
                  className={`inline-block h-5 whitespace-nowrap rounded-[45px]   px-2.5 text-sm capitalize text-[#F4F5F6]`}
                  style={{ backgroundColor: randomColor }}
                >
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </td>
        <td className="text-center">{priority}</td>
        <td>
          <div className="flex items-center justify-center space-x-3">
            <button className="text-red-500" onClick={() => onDelete(list.id)}>
              Delete
            </button>
            <button className="text-blue-500" onClick={() => onEdit(list)}>
              Edit
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default Task;
