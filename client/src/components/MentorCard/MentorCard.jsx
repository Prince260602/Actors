import PropTypes from "prop-types";
import "./MentorCard.css";

function MentorCard({ mentor }) {
  return (
    <div className="mentor-card">
      <img
        className="mentor-photo"
        src={`data:image/jpeg;base64,${mentor.photo}`}
        alt={mentor.name}
      />
      <div className="mentor-details">
        <h3 className="mentor-name">{mentor.name}</h3>
        <p className="mentor-links">
          <a href={mentor.linkedIn} target="_blank" rel="noreferrer">
            LinkedIn
          </a>{" "}
          {" | "}
          <a href={`mailto:${mentor.email}`}>Email</a>
        </p>
        <p className="mentor-description">{mentor.description}</p>
        {/* <bold>*Pay as per agreement between mentor and student.</bold> */}
      </div>
      <div className="mentor-action">
        <a
          href={mentor.url}
          className="book-demo-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a Demo
        </a>
      </div>
    </div>
  );
}

MentorCard.propTypes = {
  mentor: PropTypes.shape({
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    linkedIn: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default MentorCard;
