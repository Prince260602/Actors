import { useEffect, useState } from "react";
import { api } from "../../api/base.js";
import Loading from "../../img/Loading.gif";
import MentorCard from "../../components/MentorCard/MentorCard";
import "./index.css";

export default function Index() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await api.get("mentors");
        setMentors(response.data);
      } catch (error) {
        console.error("Failed to fetch mentors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  return (
    <section className="mentors-section">
      <div className="container">
        <h2 className="title">Meet Our Actors</h2>
        {loading ? (
          <div className="loading-container">
            <img src={Loading} alt="Loading..." height="76px" />
          </div>
        ) : mentors.length > 0 ? (
          <div className="mentors-grid">
            {mentors.map((mentor, index) => (
              <MentorCard key={index} mentor={mentor} />
            ))}
          </div>
        ) : (
          <p className="no-mentors">No Actors to display.</p>
        )}
      </div>
    </section>
  );
}
