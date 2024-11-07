import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { api } from "../../api/base.js";
import demoImage from "../../img/demoImage.png";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import BookingModal from "../../components/mentor/bookingModal.jsx";
import { Toast } from "primereact/toast";

const BookMentor = () => {
  const { email: mentorEmail } = useParams();
  const [mentorData, setMentorData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(null);

  const toastRef = useRef(null);

  const show = () => {
    toastRef.current.show({
      severity: "success",
      summary: "Success!",
      detail: "Check your email for confirmation!",
      life: 3000,
    });
  };

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await api.get(`mentors/${mentorEmail}`);
        setMentorData(response.data);
      } catch (error) {
        console.error("Error fetching mentor data", error);
      }
    };

    fetchMentorData();
  }, [mentorEmail]);

  return (
      <>
        {!mentorData ? (
            <div className="bookmentor" style={{ height: "100dvh", position: "relative" }}>
              <div className="loading-spinner">
                <ProgressSpinner />
              </div>
            </div>
        ) : (
            <div className="bookmentor">
              <Toast ref={toastRef} />
              {isModalOpen && (
                  <BookingModal
                      mentorEmail={mentorEmail}
                      onClose={() => setIsModalOpen(false)}
                      date={date}
                      setDate={setDate}
                      showToast={show}
                  />
              )}
              <div className="bookmentorsubpart">
                <div className="bookmentorsub1">
                  {/* //! Add the image later */}
                  {/* <img src={demoImage} alt="" className="profileimg" /> */}
                  <div className="sub1part2">
                    <div className="name">
                      {mentorData ? mentorData.fullName : "Loading..."}
                    </div>
                    <div className="designation">
                      Web Developer at {mentorData.companyName}
                    </div>
                  </div>
                </div>
                <div className="bookmentorsub2">
                  <div className="sub2part1">Expertise</div>
                  <div className="sub2part2">
                    {mentorData.skills.map((skill, index) => (
                        <div key={index} className="skills">
                          {skill}
                        </div>
                    ))}
                  </div>
                </div>
                <div className="bookmentorsub3">
                  <div className="sub3part1">Availability</div>
                  <div className="sub3part2">
                    <div className="days">
                      <div className="clock">
                        <FontAwesomeIcon icon={faClock} className="clockicon" />
                      </div>
                      <div className="dayspart2">
                        <div>Thursday, 8:00 PM</div>
                        <div className="price">60 minutes</div>
                      </div>
                    </div>
                    <div className="days">
                      <div className="clock">
                        <FontAwesomeIcon icon={faClock} className="clockicon" />
                      </div>
                      <div className="dayspart2">
                        <div>Thursday, 9:00 PM</div>
                        <div className="price">60 minutes</div>
                      </div>
                    </div>
                    <div className="days">
                      <div className="clock">
                        <FontAwesomeIcon icon={faClock} className="clockicon" />
                      </div>
                      <div className="dayspart2">
                        <div>Saturday, 11:00 AM</div>
                        <div className="price">60 minutes</div>
                      </div>
                    </div>

                  </div>

                </div>
                <div className="book-btn">
                  <Button
                      className="booknow"
                      onClick={() => setIsModalOpen((prev) => !prev)}
                  >
                    Book now
                  </Button>
                </div>
              </div>
            </div>
        )}
      </>
  );
};

export default BookMentor;
