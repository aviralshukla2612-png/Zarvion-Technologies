import React from 'react';
import '../PrivacyPolicy/PrivacyPolicy.css'; // Reusing the same styles

const Terms = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1 className="policy-title">Terms & <span>Conditions</span></h1>
        
        <div className="policy-content">
          <section className="policy-section">
            <h2>Who we are</h2>
            <p>Our website address is: https://zarviontechnologies.com.</p>
          </section>

          <section className="policy-section">
            <h2>Comments</h2>
            <p>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.</p>
            <p>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.</p>
          </section>

          <section className="policy-section">
            <h2>Media</h2>
            <p>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p>
          </section>

          <section className="policy-section">
            <h2>Cookies</h2>
            <p>If you leave a comment on our site or use our contact forms, you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again. These cookies will last for one year.</p>
          </section>

          <section className="policy-section">
            <h2>Embedded content from other websites</h2>
            <p>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p>
            <p>These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content.</p>
          </section>

          <section className="policy-section">
            <h2>Who we share your data with</h2>
            <p>We do not share your personal data with any third-party marketing services. Information submitted through contact or career forms is strictly used for internal communication and evaluation.</p>
          </section>

          <section className="policy-section">
            <h2>How long we retain your data</h2>
            <p>If you leave a comment or submit a form, the data and its metadata are retained indefinitely. This is so we can recognize and follow up with you regarding your inquiries or career applications.</p>
          </section>

          <section className="policy-section">
            <h2>What rights you have over your data</h2>
            <p>If you have submitted data through our site (e.g., via contact forms or career applications), you can request to receive an exported file of the personal data we hold about you. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p>
          </section>

          <section className="policy-section">
            <h2>Where your data is sent</h2>
            <p>Visitor comments may be checked through an automated spam detection service.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
