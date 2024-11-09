import "./index.css";
import { useEffect, useState } from "react";
import mainImage from "../../img/456.jpg";
import MentorCard from "../../components/MentorCard/MentorCard.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay, EffectFade, Pagination } from "swiper/modules";
import "@splidejs/react-splide/css";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/base.js";
import loadingGif from "../../img/Loading.gif";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Home = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMentors = async () => {
      try {
        const response = await api.get("mentors");
        setMentors(response.data);
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    };
    getMentors();
  }, []);

  const [text] = useTypewriter({
    words: [
      "Audition Tips",
      "Acting Techniques",
      "Live Performance",
      "Drama Coaching",
      "Film and Theatre Roles",
      "Screen Acting",
    ],
    loop: {},
  });

  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <main className="main-content">
        <div className="home-container">
          <div className="info-content">
            <div className="fields-info">
            Spotlight on Talent Dive into the Lives of Actors{" "}
            </div>
            <div
              className="fleid"
              style={{
                fontSize: "30px",
                textAlign: "center",
                color: "navy",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              {text}
              <Cursor />
            </div>
            <img src={mainImage} alt="" />
          </div>
          <div className="mentors-content">
            <h2>Explore Actors</h2>
            {loading ? (
              <div className="loading-container">
                <img src={loadingGif} alt="Loading..." />
              </div>
            ) : (
              <>
                <div className="carousel" style={{ width: "90vw", display: "flex", alignItems: "stretch"}}>
                  <Swiper
                    navigation
                    modules={[Navigation, Autoplay, EffectFade, Pagination]}
                    className="mySwiper"
                    slidesPerView={1}
                    spaceBetween={10}
                    autoplay={{ delay: 3000 }}
                    pagination={{ type: "progressbar" }}
                    breakpoints={{
                      640: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                    }}
                  >
                    {mentors &&
                      mentors.map((mentor, index) => (
                        <SwiperSlide key={index} style={{display: "flex", justifyContent: "center", alignItems: "stretch"}}>
                          <div className="slider">
                            <MentorCard key={index} mentor={mentor} />
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>

                <div className="explore-all-btn">
                  <button
                    onClick={() => {
                      navigate("/Actors");
                    }}
                  >
                    Explore all
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
