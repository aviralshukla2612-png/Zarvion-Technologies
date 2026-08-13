import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1 className="policy-title">Privacy <span>Policy</span></h1>
        
        <div className="policy-content">
          <section className="policy-section">
            <h2>1. Information We Collect</h2>
            <ul>
              <li>Personal details provided during enrollment (name, contact info, payment details).</li>
              <li>Employment-related information (salary, job offer details) necessary to calculate service fees.</li>
              <li>Data voluntarily shared during training and support interactions.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To provide career training, coaching, and support services.</li>
              <li>To manage billing, invoicing, and service fee collection.</li>
              <li>To improve our services and offer relevant content.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Confidentiality</h2>
            <ul>
              <li>All proprietary and personal information shared by the Client will be treated as confidential.</li>
              <li>Information will not be disclosed to third parties without consent, except as required by law or for payment collection purposes.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>4. Data Protection</h2>
            <ul>
              <li>Payments are processed securely via ACH or Stripe.</li>
              <li>Zarvion Technologies takes reasonable measures to protect personal data from unauthorized access or misuse.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>5. Client Rights</h2>
            <ul>
              <li>Clients may request clarification on how their data is used.</li>
              <li>By using our services, Clients consent to the terms outlined in this Privacy Policy.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
