import React, { useContext, useState } from "react";
import "./BookingModal.css";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { api } from "../../api/base";
import { AuthContext } from "../../context/Authcontext";

const BookingModal = ({ mentorEmail, onClose, date, setDate, showToast }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const createBoking = async () => {
    try {
      setLoading(true);
      const response = await api.post("bookings", {
        mentor: mentorEmail,
        user: user.email,
        date,
      });
      console.log("Booking created", response.data);
      showToast();
    } catch (error) {
      console.error("Error creating booking", error);
    } finally {
      setLoading(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Date:", date);
    createBoking()
    onClose();
  };

  const handleChange = (e) => {
    const time = e.value.toLocaleString();
    setDate(time)
    console.log(time)
  }
  // remove time and add avaibility slots
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <Calendar
            value={date}
            onChange={handleChange}
            inline
            showTime
            minDate={new Date()}
            hourFormat="24h"
          />
          <Divider />
          <Button disabled={loading} type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
