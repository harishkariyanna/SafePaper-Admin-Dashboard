import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import SecurityIcon from "@mui/icons-material/Security";
import EventIcon from "@mui/icons-material/Event";
import { examService } from "../../services/examService";
import { showToast } from "../../utils/toast";
import { Delete } from "@mui/icons-material";

export default function Dashboard() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });
  const [error, setError] = useState(null);
  const [currentExam, setCurrentExam] = useState(null);
  const [loadingExam, setLoadingExam] = useState(true);
  const [loadingSchedule, setLoadingSchedule] = useState(false); // New state for scheduling loader

  const cards = [
    {
      title: "Paper Setters",
      icon: <SchoolIcon sx={{ fontSize: 40, color: "#433bff" }} />,
      path: "/dashboard/paper-setters",
      description: "Manage paper setters and their submissions",
    },
    {
      title: "Guardians",
      icon: <SecurityIcon sx={{ fontSize: 40, color: "#433bff" }} />,
      path: "/dashboard/guardians",
      description: "Manage guardians for key sharing",
    },
    {
      title: "Exam Centers",
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#433bff" }} />,
      path: "/dashboard/exam-centers",
      description: "Manage exam centers and their access",
    },
  ];

  useEffect(() => {
    loadCurrentExam();
  }, []);

  const loadCurrentExam = async () => {
    try {
      setLoadingExam(true);
      const response = await examService.getCurrentExam();
      setCurrentExam(response.data);
    } catch (err) {
      showToast.error(err.message);
    } finally {
      setLoadingExam(false);
    }
  };

  const handleDeleteExam = async () => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;

    try {
      await examService.deleteExam(currentExam._id);
      showToast.success("Exam deleted successfully");
      setCurrentExam(null);
    } catch (err) {
      showToast.error(err.message);
    }
  };

  const validateForm = () => {
    const currentDate = new Date();
    const selectedDate = new Date(formData.date);
    const [startHour, startMinute] = formData.startTime.split(":");
    const [endHour, endMinute] = formData.endTime.split(":");

    const examStartDate = new Date(selectedDate);
    examStartDate.setHours(parseInt(startHour), parseInt(startMinute));

    const examEndDate = new Date(selectedDate);
    examEndDate.setHours(parseInt(endHour), parseInt(endMinute));

    if (examStartDate <= currentDate) {
      setError("Exam start time must be in the future");
      return false;
    }

    if (examEndDate <= examStartDate) {
      setError("End time must be after start time");
      return false;
    }

    return true;
  };

  const handleScheduleExam = async (e) => {
    e.preventDefault();
    setError(null);
    setLoadingSchedule(true); // Start loading when scheduling

    try {
      if (!validateForm()) return;

      await examService.scheduleExam(formData);
      showToast.success("Exam scheduled successfully");
      setOpenDialog(false);
      setFormData({ date: "", startTime: "", endTime: "" });
      loadCurrentExam();
    } catch (err) {
      if (err.response.data.message === "Not enough questions in the system") {
        setError("Not enough questions in the system");
      } else if (err.response.data.message === "Network error") {
        setOpenDialog(false);
        loadCurrentExam();
      } else {
        setError(err.message || "Failed to schedule exam");
      }
      showToast.error(err.message || "Failed to schedule exam");
    } finally {
      setLoadingSchedule(false); // Stop loading after scheduling
    }
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-4xl font-space-grotesk text-primary font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-secondary bg-opacity-30 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-secondary hover:border-primary"
            onClick={() => navigate(card.path)}
          >
            <div className="text-accent text-3xl mb-4">{card.icon}</div>
            <p className="text-xl md:text-2xl font-space-grotesk text-textcolor font-bold mb-2">
              {card.title}
            </p>
            <p className="text-xs text-accent font-light">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-secondary bg-opacity-30 rounded-xl shadow-sm p-6 border border-secondary">
        <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
          <h2 className="text-xl md:text-2xl font-space-grotesk text-primary font-bold">
            Exam Management
          </h2>
          {!currentExam && (
            <Button
              variant="contained"
              startIcon={<EventIcon />}
              sx={{
                backgroundColor: "#2f27ce",
                "&:hover": {
                  backgroundColor: "#433bff",
                },
                borderRadius: "8px",
                textTransform: "none",
                fontFamily: "Poppins",
                fontWeight: 500,
                padding: "8px 20px",
              }}
              onClick={() => setOpenDialog(true)}
              className="w-full md:w-auto"
            >
              Schedule New Exam
            </Button>
          )}
        </div>
        {loadingExam ? (
          <CircularProgress size={24} />
        ) : currentExam ? (
          <div className="mb-3 mt-3">
            <h2 className="text-lg font-space-grotesk text-textcolor mb-2">
              Current Exam
            </h2>
            <div className="flex justify-between items-center flex-col md:flex-row">
              <div className="flex flex-col gap-2 w-full mb-8 md:mb-0">
                <p>Date: {new Date(currentExam.date).toLocaleDateString()}</p>
                <p>
                  Time: {currentExam.startTime} - {currentExam.endTime}
                </p>
                <p>Status: {currentExam.status}</p>
              </div>
              <Button
                variant="outlined"
                onClick={handleDeleteExam}
                disabled={currentExam.status === "in-progress"}
                className="w-full md:w-auto hover:bg-red-500 hover:text-white flex items-center justify-center"
                sx={{ borderColor: "red", color: "red" }}
              >
                <Delete />
                <span className="ml-2">Delete Exam</span>
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleScheduleExam}>
          <DialogTitle
            sx={{
              fontFamily: "Space Grotesk",
              fontWeight: 600,
              color: "#2f27ce",
            }}
          >
            Schedule New Exam
          </DialogTitle>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <div className="flex flex-col gap-2 mt-2">
              <TextField
                type="date"
                label="Exam Date"
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#2f27ce",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2f27ce",
                    },
                  },
                }}
              />
              <TextField
                type="time"
                label="Start Time"
                InputLabelProps={{ shrink: true }}
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#2f27ce",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2f27ce",
                    },
                  },
                }}
              />
              <TextField
                type="time"
                label="End Time"
                InputLabelProps={{ shrink: true }}
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&:hover fieldset": {
                      borderColor: "#2f27ce",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2f27ce",
                    },
                  },
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} sx={{ color: "#666" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loadingSchedule} // Disable button while loading
              sx={{
                backgroundColor: "#2f27ce",
                "&:hover": {
                  backgroundColor: "#433bff",
                },
                borderRadius: "8px",
                textTransform: "none",
                fontFamily: "Poppins",
                fontWeight: 500,
              }}
            >
              {loadingSchedule ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Schedule Exam"
              )}{" "}
              {/* Show loader or text */}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
