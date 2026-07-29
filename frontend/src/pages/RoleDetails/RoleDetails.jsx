import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './RoleDetails.css';

const ROLES = [
  {
    slug: "full-stack-developer",
    category: "Software Development",
    title: "Full Stack Developer",
    desc: "Build scalable web applications using React, Node.js, Express, MongoDB, and cloud technologies. Full Stack Developers remain one of the highest-demand careers worldwide.",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    salary: "£60k–£120k",
    demand: "Very High",
    experience: "0–5 Years",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "ai-engineer",
    category: "Artificial Intelligence",
    title: "AI Engineer",
    desc: "Develop intelligent applications using Machine Learning, Deep Learning, LLMs, Computer Vision, and Generative AI technologies.",
    skills: ["Python", "TensorFlow", "PyTorch", "LLMs"],
    salary: "£80k–£160k",
    demand: "Extremely High",
    experience: "1–6 Years",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "cyber-security-analyst",
    category: "Cyber Security",
    title: "Cyber Security Analyst",
    desc: "Protect organisations against cyber threats through penetration testing, vulnerability assessments, incident response, and security monitoring.",
    skills: ["Networking", "Linux", "SOC", "Ethical Hacking"],
    salary: "£65k–£140k",
    demand: "Very High",
    experience: "1–5 Years",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "cloud-engineer",
    category: "Cloud Computing",
    title: "Cloud Engineer",
    desc: "Design and maintain cloud infrastructure using AWS, Azure, Docker, Kubernetes, and Infrastructure as Code.",
    skills: ["AWS", "Azure", "Docker", "Kubernetes"],
    salary: "£70k–£150k",
    demand: "Very High",
    experience: "1–6 Years",
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "data-scientist",
    category: "Data Science",
    title: "Data Scientist",
    desc: "Transform business data into valuable insights using Python, SQL, Machine Learning, Power BI, and statistical analysis.",
    skills: ["Python", "SQL", "Power BI", "ML"],
    salary: "£65k–£145k",
    demand: "High",
    experience: "1–5 Years",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "devops-engineer",
    category: "DevOps",
    title: "DevOps Engineer",
    desc: "Automate software deployment pipelines and manage infrastructure with CI/CD, Kubernetes, Docker, Jenkins, and GitHub Actions.",
    skills: ["Docker", "Jenkins", "GitHub", "Terraform"],
    salary: "£70k–£150k",
    demand: "Very High",
    experience: "2–6 Years",
    img: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1200&auto=format&fit=crop"
  },
  {
    slug: "ui-ux-designer",
    category: "UI/UX Design",
    title: "UI/UX Designer",
    desc: "Create intuitive digital experiences through user research, prototyping, design systems, and modern interface design.",
    skills: ["Figma", "Adobe XD", "Prototyping", "UX Research"],
    salary: "£55k–£110k",
    demand: "High",
    experience: "0–4 Years",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop"
  }
];

const RoleDetails = () => {
  const { slug } = useParams();
  const [role, setRole] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundRole = ROLES.find(r => r.slug === slug);
    setRole(foundRole);
    if (foundRole) {
      document.title = `${foundRole.title} — Zarvion Technologies`;
    } else {
      document.title = 'Role Not Found — Zarvion Technologies';
    }
  }, [slug]);

  if (!role) {
    return (
      <div className="detail-page">
        <div className="detail-wrap">
          <div className="not-found">
            <h2>Role not found</h2>
            <p>We couldn't find the career page you were looking for.<br />
              <Link to="/">Return to Home</Link></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-wrap">
        <Link className="back-link" to="/#demanded">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          Back to Career Opportunities
        </Link>

        <div className="detail-card">
          <div className="detail-image">
            <img src={role.img} alt={role.title} />
          </div>
          <div className="detail-body">
            <span className="detail-category">{role.category}</span>
            <h1 className="detail-title">{role.title}</h1>
            <p className="detail-desc">{role.desc}</p>

            <div className="detail-skills">
              {role.skills.map(s => (
                <span className="skill-pill" key={s}>{s}</span>
              ))}
            </div>

            <div className="detail-meta">
              <div className="meta-item">
                <span className="meta-label">Salary</span>
                <span className="meta-value">{role.salary}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Demand</span>
                <span className="meta-value demand-value">{role.demand}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Experience</span>
                <span className="meta-value">{role.experience}</span>
              </div>
            </div>

            <a className="detail-cta" href={`mailto:careers@zarviontechnologies.com?subject=Application: ${encodeURIComponent(role.title)}`}>
              Apply Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleDetails;
