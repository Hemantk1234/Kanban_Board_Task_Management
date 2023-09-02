import {
  Box,
  Button,
  Typography,
  Divider,
  TextField,
  IconButton,
  Card,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import sectionApi from "../../api/sectionApi";
import taskApi from "../../api/taskApi";
import TaskModal from "./TaskModal";
import "./MobileScreen.css";

let timer;
const timeout = 500;

const Kanban = (props) => {
  const boardId = props.boardId;

  // State for managing Kanban data and selected task
  const [data, setData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(undefined);

  useEffect(() => {
    // Initialize data state with props.data
    setData(props.data);
  }, [props.data]);

  // Function to handle drag and drop tasks within sections
  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
    const destinationColIndex = data.findIndex(
      (e) => e.id === destination.droppableId
    );
    const sourceCol = data[sourceColIndex];
    const destinationCol = data[destinationColIndex];

    const sourceSectionId = sourceCol.id;
    const destinationSectionId = destinationCol.id;

    const sourceTasks = [...sourceCol.tasks];
    const destinationTasks = [...destinationCol.tasks];

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      data[sourceColIndex].tasks = sourceTasks;
      data[destinationColIndex].tasks = destinationTasks;
    } else {
      const [removed] = destinationTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      data[destinationColIndex].tasks = destinationTasks;
    }

    try {
      await taskApi.updatePosition(boardId, {
        resourceList: sourceTasks,
        destinationList: destinationTasks,
        resourceSectionId: sourceSectionId,
        destinationSectionId: destinationSectionId,
      });
      setData(data);
    } catch (err) {
      alert(err);
    }
  };

  // Function to create a new section
  const createSection = async () => {
    try {
      const section = await sectionApi.create(boardId);
      setData([...data, section]);
    } catch (err) {
      alert(err);
    }
  };

  // Function to delete a section
  const deleteSection = async (sectionId) => {
    try {
      await sectionApi.delete(boardId, sectionId);
      const newData = [...data].filter((e) => e.id !== sectionId);
      setData(newData);
    } catch (err) {
      alert(err);
    }
  };

  // Function to update section title
  const updateSectionTitle = async (e, sectionId) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    const newData = [...data];
    const index = newData.findIndex((e) => e.id === sectionId);
    newData[index].title = newTitle;
    setData(newData);
    timer = setTimeout(async () => {
      try {
        await sectionApi.update(boardId, sectionId, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  // Function to create a new task within a section
  const createTask = async (sectionId) => {
    try {
      const task = await taskApi.create(boardId, { sectionId });
      const newData = [...data];
      const index = newData.findIndex((e) => e.id === sectionId);
      newData[index].tasks.unshift(task);
      setData(newData);
    } catch (err) {
      alert(err);
    }
  };

  // Function to update a task's details
  const onUpdateTask = (task) => {
    const newData = [...data];
    const sectionIndex = newData.findIndex((e) => e.id === task.section.id);
    const taskIndex = newData[sectionIndex].tasks.findIndex(
      (e) => e.id === task.id
    );
    newData[sectionIndex].tasks[taskIndex] = task;
    setData(newData);
  };

  // Function to delete a task
  const onDeleteTask = (task) => {
    const newData = [...data];
    const sectionIndex = newData.findIndex((e) => e.id === task.section.id);
    const taskIndex = newData[sectionIndex].tasks.findIndex(
      (e) => e.id === task.id
    );
    newData[sectionIndex].tasks.splice(taskIndex, 1);
    setData(newData);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={createSection}>Organize tasks</Button>
        <Typography variant="body2" fontWeight="700">
          {data.length} Sections
        </Typography>
      </Box>
      <Divider sx={{ margin: "10px 0" }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            width: "calc(100vw - 400px)",
            overflowX: "auto",
          }}
        >
          {data.map((section) => (
            <div key={section.id} style={{ width: "300px" }}>
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      width: "300px",
                      padding: "10px",
                      marginRight: "10px",
                    }}
                  >
                    {/* Section header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      {/* Input field for section title */}
                      <TextField
                        value={section.title}
                        onChange={(e) => updateSectionTitle(e, section.id)}
                        placeholder="Untitled"
                        variant="outlined"
                        sx={{
                          flexGrow: 1,
                          "& .MuiOutlinedInput-input": { padding: 0 },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "unset ",
                          },
                          "& .MuiOutlinedInput-root": {
                            fontSize: "1rem",
                            fontWeight: "700",
                          },
                        }}
                      />
                      {/* Button to add new task */}
                      <Tooltip title="Add subtasks">
                        <IconButton
                          variant="outlined"
                          size="small"
                          sx={{
                            color: "gray",
                            "&:hover": { color: "green" },
                          }}
                          onClick={() => createTask(section.id)}
                        >
                          <AddOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      {/* Button to delete section */}
                      <Tooltip title="Delete Status Group">
                        <IconButton
                          variant="outlined"
                          size="small"
                          sx={{
                            color: "gray",
                            "&:hover": { color: "red" },
                          }}
                          onClick={() => deleteSection(section.id)}
                        >
                          <DeleteOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    {/* Render tasks within the section */}
                    {section.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              padding: "10px",
                              marginBottom: "10px",
                              cursor: snapshot.isDragging
                                ? "grab"
                                : "pointer!important",
                            }}
                            onClick={() => setSelectedTask(task)}
                          >
                            {/* Display task title */}
                            <Typography>
                              {task.title === "" ? "Untitled" : task.title}
                            </Typography>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </div>
          ))}
        </Box>
      </DragDropContext>
      {/* Render the task modal */}
      <TaskModal
        task={selectedTask}
        boardId={boardId}
        onClose={() => setSelectedTask(undefined)}
        onUpdate={onUpdateTask}
        onDelete={onDeleteTask}
      />
    </>
  );
};

export default Kanban;
