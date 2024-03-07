import { data } from "../db/db";
const initialState = {
    taskData: data
}

const taskReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return {
                taskData: [...state.taskData, action.payload]
            }
            break

        case 'EDIT_TASK':
            return {
                taskData: state.taskData.map((task) => {
                    if (task.id === action.payload.id) {
                        return action.payload;
                    }
                    return task;
                })
            }
            break
        case "DELETE_TASK":


            return { taskData: state.taskData.filter((task) => task.id !== action.payload) }
            break

        case "DELETE_ALL_TASK":
            return { taskData: [] }
            break

        case "ADD_FAV":
            return {
                taskData:
                    state.taskData.map((task) => {
                        if (task.id === action.payload) {
                            return{
                                ...task,
                                isFavorite: !task.isFavorite
                            };
                        } else {
                            return task;
                        }
                    })
            }
            break
    }
}

export {
    initialState, taskReducer
}