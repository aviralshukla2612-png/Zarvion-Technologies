// ============================================================
// GetStarted.jsx — Zarvion Technologies
// Premium Candidate Onboarding Page
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './GetStarted.css';

const GetStarted = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    country: '',
    currentCity: '',
    dateOfBirth: '',
    gender: '',
    // Education
    highestQualification: '',
    college: '',
    graduationYear: '',
    branch: '',
    // Work Experience
    currentJobTitle: '',
    currentCompany: '',
    yearsOfExperience: '',
    currentSalary: '',
    expectedSalary: '',
    noticePeriod: '',
    // Career Preferences
    preferredJobRole: '',
    preferredIndustry: '',
    preferredCountry: '',
    employmentType: '',
    workMode: '',
    joiningDate: '',
    // Technical Profile
    technicalSkills: '',
    certifications: '',
    languagesKnown: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    // About You
    careerGoals: '',
    aboutYourself: '',
    additionalNotes: '',
    // Consent
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [counters, setCounters] = useState({
    candidates: '0',
    success: '0',
    partners: '0',
    countries: '0',
  });

  const statsRef = useRef(null);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const targets = [
      { key: 'candidates', target: 5000, suffix: '+' },
      { key: 'success', target: 98, suffix: '%' },
      { key: 'partners', target: 250, suffix: '+' },
      { key: 'countries', target: 15, suffix: '+' },
    ];

    targets.forEach(({ key, target, suffix }) => {
      let current = 0;
      const increment = target / 50;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setCounters((prev) => ({
          ...prev,
          [key]: Math.round(current) + suffix,
        }));
      }, 30);
    });
  };

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { q: 'How long does the hiring process take?', a: 'The hiring process typically takes 2-4 weeks depending on the role and employer requirements.' },
    { q: 'Do you help freshers?', a: 'Absolutely! We have dedicated programs for freshers and entry-level candidates.' },
    { q: 'Is resume building included?', a: 'Yes, our premium package includes professional resume building and optimisation services.' },
    { q: 'Do you provide visa support?', a: 'We offer comprehensive visa and documentation support for international placements.' },
    { q: 'Can I update my application later?', a: 'Yes, you can update your application by contacting our support team.' },
  ];

  const features = [
    { icon: '📄', title: 'Resume Building', desc: 'Professional resume writing and ATS optimisation.' },
    { icon: '💼', title: 'LinkedIn Optimization', desc: 'Transform your profile into a recruiter magnet.' },
    { icon: '🎯', title: 'Interview Preparation', desc: 'Ace every interview with expert coaching.' },
    { icon: '🌍', title: 'Global Placement', desc: 'Access opportunities with top employers worldwide.' },
    { icon: '🗺️', title: 'Career Roadmap', desc: 'Get a clear path to your dream career.' },
    { icon: '📋', title: 'Visa Assistance', desc: 'Expert guidance for work permits and documentation.' },
  ];

  const timelineSteps = [
    { step: 'Submit Application', desc: 'Fill in your details and upload your resume.' },
    { step: 'Career Consultation', desc: 'Connect with our expert career advisors.' },
    { step: 'Resume Review', desc: 'Get professional feedback and optimisation.' },
    { step: 'Interview Preparation', desc: 'Practice with mock interviews and coaching.' },
    { step: 'Company Matching', desc: 'Get matched with top employers worldwide.' },
    { step: 'Get Hired', desc: 'Land your dream role with our full support.' },
  ];

  if (isSubmitted) {
    return (
      <div className="getstarted-page">
        <div className="getstarted-success">
          <div className="getstarted-success-card">
            <div className="getstarted-success-icon">✅</div>
            <h2 className="getstarted-success-title">Thank You for Submitting!</h2>
            <p className="getstarted-success-desc">
              Our recruitment team will review your profile and contact you shortly.
            </p>
            <Link to="/" className="getstarted-success-btn">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="getstarted-page">

      {/* ============================================================
           SECTION 1: HERO
           ============================================================ */}
      <section className="getstarted-hero">
        <div className="getstarted-hero-bg">
          <div className="getstarted-hero-glow" />
          <div className="getstarted-hero-glow getstarted-hero-glow--2" />
        </div>

        <div className="getstarted-hero-particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="getstarted-hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 4 + 3}s`,
                background: `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1})`,
              }}
            />
          ))}
        </div>

        <div className="getstarted-hero-content">
          <div className="getstarted-hero-text">
            <span className="getstarted-hero-badge">🚀 START YOUR JOURNEY</span>
            <h1 className="getstarted-hero-title">
              Start Your <span className="getstarted-hero-title-accent">Career Journey</span> Today
            </h1>
            <p className="getstarted-hero-desc">
              Zarvion Technologies connects ambitious professionals with world-class opportunities.
              We help you build your career path, from resume to placement, with expert guidance every step of the way.
            </p>
            <div className="getstarted-hero-buttons">
              <a href="#form" className="getstarted-hero-btn getstarted-hero-btn--primary">
                Start Application
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="#contact" className="getstarted-hero-btn getstarted-hero-btn--secondary">
                Talk to an Expert
              </a>
            </div>
          </div>

          <div className="getstarted-hero-illustration">
            <div className="getstarted-hero-illustration-icon">🚀</div>
            <div className="getstarted-hero-illustration-ring" />
            <div className="getstarted-hero-illustration-ring getstarted-hero-illustration-ring--2" />
            <div className="getstarted-hero-illustration-orb" style={{
              transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
            }} />
          </div>
        </div>

        <div className="getstarted-hero-scroll">
          <span>Scroll</span>
          <div className="getstarted-hero-scroll-line" />
        </div>
      </section>

      {/* ============================================================
           SECTION 2: WHY CHOOSE ZARVION
           ============================================================ */}
      <section className="getstarted-features">
        <div className="getstarted-features-header animate-on-scroll">
          <span className="getstarted-features-badge">WHY ZARVION</span>
          <h2 className="getstarted-features-title">
            Premium <span className="getstarted-features-title-accent">Career Services</span>
          </h2>
          <p className="getstarted-features-desc">
            We provide end-to-end career support with industry-leading expertise.
          </p>
        </div>

        <div className="getstarted-features-grid">
          {features.map((feature, i) => (
            <div key={i} className="getstarted-features-card animate-on-scroll" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="getstarted-features-card-icon">{feature.icon}</div>
              <h3 className="getstarted-features-card-title">{feature.title}</h3>
              <p className="getstarted-features-card-desc">{feature.desc}</p>
              <div className="getstarted-features-card-glow" />
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
           SECTION 3: HOW IT WORKS
           ============================================================ */}
      <section className="getstarted-timeline">
        <div className="getstarted-timeline-header animate-on-scroll">
          <span className="getstarted-timeline-badge">PROCESS</span>
          <h2 className="getstarted-timeline-title">
            How It <span className="getstarted-timeline-title-accent">Works</span>
          </h2>
        </div>

        <div className="getstarted-timeline-steps">
          {timelineSteps.map((item, i) => (
            <div key={i} className="getstarted-timeline-step animate-on-scroll" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="getstarted-timeline-step-number">{i + 1}</div>
              <div className="getstarted-timeline-step-content">
                <h3 className="getstarted-timeline-step-title">{item.step}</h3>
                <p className="getstarted-timeline-step-desc">{item.desc}</p>
              </div>
              {i < timelineSteps.length - 1 && (
                <div className="getstarted-timeline-step-line" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
           SECTION 4: STATISTICS
           ============================================================ */}
      <section className="getstarted-stats" ref={statsRef}>
        <div className="getstarted-stats-grid">
          <div className="getstarted-stats-item">
            <div className="getstarted-stats-number">{counters.candidates}</div>
            <div className="getstarted-stats-label">Candidates Guided</div>
          </div>
          <div className="getstarted-stats-item">
            <div className="getstarted-stats-number">{counters.success}</div>
            <div className="getstarted-stats-label">Success Rate</div>
          </div>
          <div className="getstarted-stats-item">
            <div className="getstarted-stats-number">{counters.partners}</div>
            <div className="getstarted-stats-label">Hiring Partners</div>
          </div>
          <div className="getstarted-stats-item">
            <div className="getstarted-stats-number">{counters.countries}</div>
            <div className="getstarted-stats-label">Countries</div>
          </div>
        </div>
      </section>

      {/* ============================================================
           SECTION 5: APPLICATION FORM
           ============================================================ */}
      <section className="getstarted-form" id="form">
        <div className="getstarted-form-header animate-on-scroll">
          <span className="getstarted-form-badge">APPLICATION</span>
          <h2 className="getstarted-form-title">
            Start Your <span className="getstarted-form-title-accent">Journey</span>
          </h2>
          <p className="getstarted-form-desc">
            Fill in the details below and begin your career journey with Zarvion Technologies.
          </p>
        </div>

        <div className="getstarted-form-container animate-on-scroll">
          <form onSubmit={handleSubmit} className="getstarted-form-form">
            {/* Personal Information */}
            <div className="getstarted-form-section">
              <h3 className="getstarted-form-section-title">Personal Information</h3>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`getstarted-form-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <span className="getstarted-form-error">{errors.fullName}</span>}
                </div>
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`getstarted-form-input ${errors.email ? 'error' : ''}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="getstarted-form-error">{errors.email}</span>}
                </div>
              </div>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`getstarted-form-input ${errors.phone ? 'error' : ''}`}
                    placeholder="+1 234 567 8900"
                  />
                  {errors.phone && <span className="getstarted-form-error">{errors.phone}</span>}
                </div>
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="United States"
                  />
                </div>
              </div>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Current City</label>
                  <input
                    type="text"
                    name="currentCity"
                    value={formData.currentCity}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="New York"
                  />
                </div>
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="getstarted-form-input"
                  />
                </div>
              </div>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="getstarted-form-input"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="getstarted-form-section">
              <h3 className="getstarted-form-section-title">Education</h3>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Highest Qualification</label>
                  <input
                    type="text"
                    name="highestQualification"
                    value={formData.highestQualification}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="B.Tech, MBA, etc."
                  />
                </div>
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">College / University</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="University Name"
                  />
                </div>
              </div>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Graduation Year</label>
                  <input
                    type="number"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="2020"
                  />
                </div>
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Branch / Stream</label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="Computer Science, Finance, etc."
                  />
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="getstarted-form-section">
              <h3 className="getstarted-form-section-title">Work Experience</h3>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Current Job Title</label>
                  <input
                    type="text"
                    name="currentJobTitle"
                    value={formData.currentJobTitle}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Current Company</label>
                  <input
                    type="text"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="Company Name"
                  />
                </div>
              </div>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Years of Experience</label>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="3"
                  />
                </div>
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Current Salary (Annual)</label>
                  <input
                    type="text"
                    name="currentSalary"
                    value={formData.currentSalary}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="$80,000"
                  />
                </div>
              </div>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Expected Salary (Annual)</label>
                  <input
                    type="text"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="$100,000"
                  />
                </div>
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Notice Period</label>
                  <input
                    type="text"
                    name="noticePeriod"
                    value={formData.noticePeriod}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="30 days"
                  />
                </div>
              </div>
            </div>

            {/* Career Preferences */}
            <div className="getstarted-form-section">
              <h3 className="getstarted-form-section-title">Career Preferences</h3>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Preferred Job Role</label>
                  <input
                    type="text"
                    name="preferredJobRole"
                    value={formData.preferredJobRole}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="Full Stack Developer"
                  />
                </div>
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Preferred Industry</label>
                  <input
                    type="text"
                    name="preferredIndustry"
                    value={formData.preferredIndustry}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="Technology, Finance, etc."
                  />
                </div>
              </div>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Preferred Country</label>
                  <input
                    type="text"
                    name="preferredCountry"
                    value={formData.preferredCountry}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="USA, Canada, UK, etc."
                  />
                </div>
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Employment Type</label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="getstarted-form-input"
                  >
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Work Mode</label>
                  <select
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleChange}
                    className="getstarted-form-input"
                  >
                    <option value="">Select Mode</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                  </select>
                </div>
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Available Joining Date</label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    className="getstarted-form-input"
                  />
                </div>
              </div>
            </div>

            {/* Technical Profile */}
            <div className="getstarted-form-section">
              <h3 className="getstarted-form-section-title">Technical Profile</h3>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Technical Skills</label>
                  <input
                    type="text"
                    name="technicalSkills"
                    value={formData.technicalSkills}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="React, Node.js, Python, etc."
                  />
                </div>
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Certifications</label>
                  <input
                    type="text"
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="AWS Certified, PMP, etc."
                  />
                </div>
              </div>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Languages Known</label>
                  <input
                    type="text"
                    name="languagesKnown"
                    value={formData.languagesKnown}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="English, Spanish, etc."
                  />
                </div>
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">LinkedIn URL</label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">GitHub URL</label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
                <div className="getstarted-form-group">
                  <label className="getstarted-form-label">Portfolio URL</label>
                  <input
                    type="url"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    className="getstarted-form-input"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>

            {/* About You */}
            <div className="getstarted-form-section">
              <h3 className="getstarted-form-section-title">About You</h3>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group getstarted-form-group--full">
                  <label className="getstarted-form-label">Career Goals</label>
                  <textarea
                    name="careerGoals"
                    value={formData.careerGoals}
                    onChange={handleChange}
                    className="getstarted-form-input getstarted-form-textarea"
                    placeholder="What are your career goals for the next 5 years?"
                    rows="3"
                  />
                </div>
              </div>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group getstarted-form-group--full">
                  <label className="getstarted-form-label">Tell us about yourself</label>
                  <textarea
                    name="aboutYourself"
                    value={formData.aboutYourself}
                    onChange={handleChange}
                    className="getstarted-form-input getstarted-form-textarea"
                    placeholder="Share your story, experience, and what drives you."
                    rows="3"
                  />
                </div>
              </div>
              <div className="getstarted-form-row">
                <div className="getstarted-form-group getstarted-form-group--full">
                  <label className="getstarted-form-label">Additional Notes</label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    className="getstarted-form-input getstarted-form-textarea"
                    placeholder="Anything else you'd like us to know?"
                    rows="2"
                  />
                </div>
              </div>
            </div>

            {/* Consent */}
            <div className="getstarted-form-section">
              <div className="getstarted-form-consent">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="getstarted-form-checkbox"
                />
                <label className="getstarted-form-consent-label">
                  I agree to the Privacy Policy and Terms & Conditions.
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="getstarted-form-submit">
              <button
                type="submit"
                className="getstarted-form-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Start My Career Journey'}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ============================================================
           SECTION 6: FAQ
           ============================================================ */}
      <section className="getstarted-faq">
        <div className="getstarted-faq-header animate-on-scroll">
          <span className="getstarted-faq-badge">FAQ</span>
          <h2 className="getstarted-faq-title">
            Frequently Asked <span className="getstarted-faq-title-accent">Questions</span>
          </h2>
        </div>

        <div className="getstarted-faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`getstarted-faq-item ${activeFaq === i ? 'open' : ''}`}>
              <button className="getstarted-faq-question" onClick={() => toggleFaq(i)}>
                <span>{faq.q}</span>
                <span className="getstarted-faq-icon">{activeFaq === i ? '−' : '+'}</span>
              </button>
              <div className="getstarted-faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
           SECTION 7: FINAL CTA
           ============================================================ */}
      <section className="getstarted-cta">
        <div className="getstarted-cta-content animate-on-scroll">
          <div className="getstarted-cta-glow" />
          <h2 className="getstarted-cta-title">Ready to Build Your <span className="getstarted-cta-title-accent">Future</span>?</h2>
          <p className="getstarted-cta-desc">
            Join thousands of professionals who have transformed their careers with Zarvion Technologies.
          </p>
          <div className="getstarted-cta-buttons">
            <a href="#form" className="getstarted-cta-btn getstarted-cta-btn--primary">
              Apply Now
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#contact" className="getstarted-cta-btn getstarted-cta-btn--secondary">
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default GetStarted;