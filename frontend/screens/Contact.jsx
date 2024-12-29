import React from 'react';
import '../src/styles/Contact.css';

const ContactUs = () => {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>Feel free to reach out to any of our team members!</p>
      </header>

      <section className="contact-team">
        <div className="contact-member">
          <img
            src="https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-1/334288449_532942038978859_264772094911593132_n.jpg?stp=c61.0.1885.1884a_dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGFSznovQCMeYwU16uqKtkwiXsXvKQiPLSJexe8pCI8tCgYw7pX-nHugyCARQjnUTs9iKjI6V2QJRWZle73ILeQ&_nc_ohc=OxbvAiITCkUQ7kNvgEniQTj&_nc_zt=24&_nc_ht=scontent.fdac138-2.fna&_nc_gid=AexI3oIh__VQEhf9kXoQXnx&oh=00_AYC-BVr06bpo1kj4a6vUK0PWrhNmb8WKwE9q6gauo6cdZA&oe=676B25C2"
            alt="G.Araf Ahmed"
          />
          <h3>G.Araf Ahmed</h3>
          <p>📧 <a href="mailto:arafahmed541@gmail.com">arafahmed541@gmail.com</a></p>
          <p>🔗 <a href="https://www.linkedin.com/in/araf-ahmed-964a30252/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        </div>

        <div className="contact-member">
          <img
            src="https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/466359554_1097832878800076_4928405843025380823_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG28i66os5hn0qR2QnO2994eA7dEUQ9fWp4Dt0RRD19atHD0aTrjQiyKuejJdG_uvUYfpapuoJoLG6JXQLyVbiT&_nc_ohc=Zujo9OsoGqMQ7kNvgG_oqqt&_nc_zt=23&_nc_ht=scontent.fdac138-2.fna&_nc_gid=AdCZ0YRRMsHO8Kzv-p1Jo6T&oh=00_AYCx6Ic7VXMLDm_DQAd-2OxkhVTFAMThPubaxRasASnKDw&oe=676B0F68"
            alt="Fahim Foysal Abir"
          />
          <h3>Fahim Foysal Abir</h3>
          <p>📧 <a href="mailto:fahim.foysal.abir@g.bracu.ac.bd">fahim.foysal.abir@g.bracu.ac.bd</a></p>
        </div>

        <div className="contact-member">
          <img
            src="https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-1/448471589_1544579986468166_1969027409123432063_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFCVVLg0SIKJJvns-e-P8WIxIi_uglciwbEiL-6CVyLBt0folaI_704yjSQIwF_nWAIJZtK_p5fYcvHdzeDTT4M&_nc_ohc=bB2DjBgJx7kQ7kNvgEoYU9r&_nc_zt=24&_nc_ht=scontent.fdac138-2.fna&_nc_gid=AhY-xJgX8qUwquvNdYRNnT-&oh=00_AYBGDet126bRc9qgld17tgLYRJgHXcvU6RYFgdX-TJSBaQ&oe=676B1C8A"
            alt="Md. Shihab Sarker"
          />
          <h3>Md. Shihab Sarker</h3>
          <p>📧 <a href="mailto:md.shihab.sarker@g.bracu.ac.bd">md.shihab.sarker@g.bracu.ac.bd</a></p>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
