import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get('http://localhost:7002/api/about');
        setAboutData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load about information');
        setLoading(false);
        console.error('Error fetching about data:', err);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return <div className="about-container">Loading...</div>;
  if (error) return <div className="about-container">Error: {error}</div>;
  if (!aboutData) return <div className="about-container">No data available</div>;

  return (
    <div className="about-container">
      <h1>About Us</h1>
      
      <div className="about-content">
        <div className="profile-section">
          <img 
            src={aboutData.imageUrl} 
            alt={aboutData.name}
            className="profile-image"
          />
          <h2>{aboutData.name}</h2>
        </div>

        <div className="bio-section">
          <h3>Biography</h3>
          <p>{aboutData.bio}</p>
        </div>

        <div className="education-section">
          <h3>Education</h3>
          <p>{aboutData.education}</p>
        </div>

        <div className="interests-section">
          <h3>Interests</h3>
          <p>{aboutData.interests}</p>
        </div>

        {aboutData.contact && (
          <div className="contact-section">
            <h3>Contact</h3>
            <p>Email: <a href={`mailto:${aboutData.contact.email}`}>{aboutData.contact.email}</a></p>
            {aboutData.contact.github && (
              <p>GitHub: <a href={aboutData.contact.github} target="_blank" rel="noopener noreferrer">
                {aboutData.contact.github}
              </a></p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default About;