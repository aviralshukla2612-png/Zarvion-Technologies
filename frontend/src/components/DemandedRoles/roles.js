import fullStackDeveloperImg from '../../assets/images/roles/full-stack-developer.avif';
import digitalMarketingManagerImg from '../../assets/images/roles/digital-marketing-manager.avif';
import aiEngineerImg from '../../assets/images/roles/ai-engineer.avif';
import salesExecutiveImg from '../../assets/images/roles/sales-executive.avif';
import cyberSecurityAnalystImg from '../../assets/images/roles/cyber-security-analyst.avif';
import hrManagerImg from '../../assets/images/roles/hr-manager.avif';
import cloudEngineerImg from '../../assets/images/roles/cloud-engineer.avif';
import contentWriterImg from '../../assets/images/roles/content-writer.avif';
import dataScientistImg from '../../assets/images/roles/data-scientist.avif';
import businessAnalystImg from '../../assets/images/roles/business-analyst.avif';
import devopsEngineerImg from '../../assets/images/roles/devops-engineer.avif';
import financialAnalystImg from '../../assets/images/roles/financial-analyst.avif';
import uiUxDesignerImg from '../../assets/images/roles/ui-ux-designer.avif';
import operationsManagerImg from '../../assets/images/roles/operations-manager.avif';

export const ROLES = [
  // 1 — IT
  {
    slug: "full-stack-developer",
    type: "it",
    category: "Software Development",
    title: "Full Stack Developer",
    desc: "Build scalable web applications using React, Node.js, Express, MongoDB, and cloud technologies. Full Stack Developers remain one of the highest-demand careers worldwide.",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    salary: "£60k–£120k",
    demand: "Very High",
    experience: "0–5 Years",
    img: fullStackDeveloperImg
  },
  // 2 — Non-IT
  {
    slug: "digital-marketing-manager",
    type: "non-it",
    category: "Marketing",
    title: "Digital Marketing Manager",
    desc: "Lead multi-channel marketing campaigns across SEO, paid media, email, and social platforms to drive brand growth and customer acquisition.",
    skills: ["SEO", "Google Ads", "Content Strategy", "Analytics"],
    salary: "£45k–£95k",
    demand: "High",
    experience: "2–6 Years",
    img: digitalMarketingManagerImg
  },
  // 3 — IT
  {
    slug: "ai-engineer",
    type: "it",
    category: "Artificial Intelligence",
    title: "AI Engineer",
    desc: "Develop intelligent applications using Machine Learning, Deep Learning, LLMs, Computer Vision, and Generative AI technologies.",
    skills: ["Python", "TensorFlow", "PyTorch", "LLMs"],
    salary: "£80k–£160k",
    demand: "Extremely High",
    experience: "1–6 Years",
    img: aiEngineerImg
  },
  // 4 — Non-IT
  {
    slug: "sales-executive",
    type: "non-it",
    category: "Sales",
    title: "Sales Executive",
    desc: "Drive revenue growth by building client relationships, managing pipelines, and closing deals across B2B and B2C markets.",
    skills: ["Negotiation", "CRM Tools", "Lead Generation", "Client Relations"],
    salary: "£35k–£90k",
    demand: "High",
    experience: "0–5 Years",
    img: salesExecutiveImg
  },
  // 5 — IT
  {
    slug: "cyber-security-analyst",
    type: "it",
    category: "Cyber Security",
    title: "Cyber Security Analyst",
    desc: "Protect organisations against cyber threats through penetration testing, vulnerability assessments, incident response, and security monitoring.",
    skills: ["Networking", "Linux", "SOC", "Ethical Hacking"],
    salary: "£65k–£140k",
    demand: "Very High",
    experience: "1–5 Years",
    img: cyberSecurityAnalystImg
  },
  // 6 — Non-IT
  {
    slug: "hr-manager",
    type: "non-it",
    category: "Human Resources",
    title: "HR Manager",
    desc: "Oversee recruitment, employee relations, performance management, and organisational culture initiatives across the business.",
    skills: ["Recruitment", "Employee Relations", "Payroll", "Compliance"],
    salary: "£40k–£85k",
    demand: "High",
    experience: "2–7 Years",
    img: hrManagerImg
  },
  // 7 — IT
  {
    slug: "cloud-engineer",
    type: "it",
    category: "Cloud Computing",
    title: "Cloud Engineer",
    desc: "Design and maintain cloud infrastructure using AWS, Azure, Docker, Kubernetes, and Infrastructure as Code.",
    skills: ["AWS", "Azure", "Docker", "Kubernetes"],
    salary: "£70k–£150k",
    demand: "Very High",
    experience: "1–6 Years",
    img: cloudEngineerImg
  },
  // 8 — Non-IT
  {
    slug: "content-writer",
    type: "non-it",
    category: "Content & Media",
    title: "Content Writer",
    desc: "Craft compelling copy, articles, and brand storytelling across websites, social media, and marketing collateral.",
    skills: ["Copywriting", "SEO Writing", "Editing", "Brand Voice"],
    salary: "£30k–£70k",
    demand: "Medium",
    experience: "0–4 Years",
    img: contentWriterImg
  },
  // 9 — IT
  {
    slug: "data-scientist",
    type: "it",
    category: "Data Science",
    title: "Data Scientist",
    desc: "Transform business data into valuable insights using Python, SQL, Machine Learning, Power BI, and statistical analysis.",
    skills: ["Python", "SQL", "Power BI", "ML"],
    salary: "£65k–£145k",
    demand: "High",
    experience: "1–5 Years",
    img: dataScientistImg
  },
  // 10 — Non-IT
  {
    slug: "business-analyst",
    type: "non-it",
    category: "Business Operations",
    title: "Business Analyst",
    desc: "Bridge the gap between business needs and solutions through requirements gathering, process mapping, and stakeholder management.",
    skills: ["Requirements Gathering", "Process Mapping", "Stakeholder Mgmt", "Excel"],
    salary: "£45k–£95k",
    demand: "High",
    experience: "1–6 Years",
    img: businessAnalystImg
  },
  // 11 — IT
  {
    slug: "devops-engineer",
    type: "it",
    category: "DevOps",
    title: "DevOps Engineer",
    desc: "Automate software deployment pipelines and manage infrastructure with CI/CD, Kubernetes, Docker, Jenkins, and GitHub Actions.",
    skills: ["Docker", "Jenkins", "GitHub", "Terraform"],
    salary: "£70k–£150k",
    demand: "Very High",
    experience: "2–6 Years",
    img: devopsEngineerImg
  },
  // 12 — Non-IT
  {
    slug: "financial-analyst",
    type: "non-it",
    category: "Finance",
    title: "Financial Analyst",
    desc: "Analyse financial data, build forecasting models, and support strategic decision-making across budgeting and investment planning.",
    skills: ["Financial Modelling", "Excel", "Forecasting", "Reporting"],
    salary: "£45k–£100k",
    demand: "High",
    experience: "1–6 Years",
    img: financialAnalystImg
  },
  // 13 — IT
  {
    slug: "ui-ux-designer",
    type: "it",
    category: "UI/UX Design",
    title: "UI/UX Designer",
    desc: "Create intuitive digital experiences through user research, prototyping, design systems, and modern interface design.",
    skills: ["Figma", "Adobe XD", "Prototyping", "UX Research"],
    salary: "£55k–£110k",
    demand: "High",
    experience: "0–4 Years",
    img: uiUxDesignerImg
  },
  // 14 — Non-IT
  {
    slug: "operations-manager",
    type: "non-it",
    category: "Operations",
    title: "Operations Manager",
    desc: "Oversee day-to-day business operations, optimise workflows, and manage teams to improve efficiency and service delivery.",
    skills: ["Process Improvement", "Team Leadership", "Logistics", "Budgeting"],
    salary: "£45k–£90k",
    demand: "Medium",
    experience: "3–8 Years",
    img: operationsManagerImg
  }
];