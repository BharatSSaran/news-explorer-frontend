import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <img
          src="/images/author-photo.jpg"
          alt="Author"
          className="about__photo"
        />
        <div className="about__content">
          <h2 className="about__title">About the author</h2>
          <p className="about__description">
            This project was created as part of the TripleTen Web Development
            Program. The News Explorer allows users to search for news articles
            and save them to their personal collection. Built with modern React
            practices and integrated with the News API for real-time article
            data.
          </p>
          <p className="about__description">
            The application demonstrates proficiency in React development, API
            integration, responsive design, and modern web development
            workflows.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
