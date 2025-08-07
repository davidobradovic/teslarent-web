import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./DateTimePicker.css";

const DateTimePicker = ({ onClose, onConfirm, disabled }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  // Generate time intervals between 7:30 AM and 7:00 PM (every 15 minutes)
  const generateTimes = () => {
    const times = [];
    let start = new Date();
    start.setHours(7, 30, 0, 0);

    const end = new Date();
    end.setHours(19, 0, 0, 0);

    while (start <= end) {
      times.push(
        `${start.getHours().toString().padStart(2, "0")}:${start
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      );
      start.setMinutes(start.getMinutes() + 15);
    }
    return times;
  };

    const handleConfirm = () => {
        if (selectedDate) {
            // Get the components of the selected date
            const day = selectedDate.getDate().toString().padStart(2, "0");
            const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
            const year = selectedDate.getFullYear();

            // Set the time to 08:00 (ignoring the selected time)
            const formattedDate = `${day}.${month}.${year} at 08:00`;

            // Call the onConfirm function with the formatted date
            onConfirm(formattedDate);
            onClose();
        }
    };


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="title">Select Date and Time</h2>
        <DayPicker
          mode="single"
          selected={selectedDate}
          disabled={disabled}
          onSelect={setSelectedDate}
          styles={{
            caption: { color: "#59c23d" },
            selected: { backgroundColor: "#59c23d", color: "#fff" },
          }}
          className="custom-day-picker"
        />
        {selectedDate && (
          <div className="time-picker">
            <label htmlFor="time-select">Select Time:</label>
            <select
              id="time-select"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="time-dropdown"
            >
              <option value="" disabled>
                Select a time
              </option>
              {generateTimes().map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="confirm-button"
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
