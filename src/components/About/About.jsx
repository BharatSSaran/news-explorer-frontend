import React from "react";
import "./About.css";
import authorPhoto from "../../assets/images/author-photo.jpg";

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__photo">
          <img src={authorPhoto} alt="Author" className="about__photo-img" />
        </div>
        <div className="about__content">
          <h2 className="about__title">About the author</h2>
          <p className="about__description">
            Hi, I'm Bharat Saran, a full-stack web developer specializing in
            React, JavaScript, and responsive design. I create clean,
            user-focused applications that work seamlessly across all devices.
          </p>
          <p className="about__description">
            I completed my training at TripleTen, where I mastered modern web
            development practices, API integration, and component-based
            architecture. I'm passionate about building intuitive digital
            experiences and helping businesses bring their ideas to life through
            code.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
