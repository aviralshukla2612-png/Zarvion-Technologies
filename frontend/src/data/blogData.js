import aiImage from '../assets/images/roles/ai-engineer.avif';
import hrImage from '../assets/images/roles/hr-manager.avif';
import interviewImage from '../assets/images/roles/full-stack-developer.avif';
import socialImage from '../assets/images/roles/digital-marketing-manager.avif';
import cyberImage from '../assets/images/roles/cyber-security-analyst.avif';
import opsImage from '../assets/images/roles/operations-manager.avif';

export const ARTICLE_POSTS = [
  {
    id: 1,
    title: "The Future of AI in Tech Recruitment",
    excerpt: "How artificial intelligence is streamlining the talent acquisition process and what it means for job seekers.",
    category: "Technology",
    date: "Aug 12, 2026",
    image: aiImage,
    author: "Zarvion Research Team",
    content: `
      <h2>Streamlining the Acquisition Process</h2>
      <p>Modern applicant tracking systems (ATS) now leverage deep learning algorithms to not just parse keywords, but to understand the context of a candidate's experience. This means candidates who have non-traditional backgrounds but highly relevant skills are less likely to fall through the cracks.</p>
      
      <h2>What This Means for Job Seekers</h2>
      <p>For job seekers, this shift requires a new approach to application strategy. Simply stuffing a resume with keywords is no longer effective. Candidates must focus on:</p>
      <ul>
        <li>Demonstrating the impact of their work using concrete metrics.</li>
        <li>Maintaining a cohesive professional narrative across all platforms.</li>
        <li>Ensuring their LinkedIn profiles are highly optimized, as AI sourcing tools frequently scan public professional networks.</li>
      </ul>
      
      <h2>The Human Element</h2>
      <p>Despite the rise of automation, the human element remains irreplaceable. AI handles the heavy lifting of initial screening, allowing recruiters to spend more time on meaningful interactions—assessing cultural fit, understanding a candidate's long-term goals, and building relationships.</p>
    `
  },
  {
    id: 2,
    title: "Navigating the Shift to Hybrid Work Models",
    excerpt: "Best practices for building strong company culture when half your team is working remotely.",
    category: "Workplace",
    date: "Jul 28, 2026",
    image: opsImage,
    author: "Zarvion Operations",
    content: `
      <h2>Redefining Company Culture</h2>
      <p>Building a cohesive culture is notoriously difficult when team members are distributed. Best-in-class organizations have shifted from "watercooler" culture to intentional connection. This means structuring meetings to include remote participants equally and prioritizing asynchronous communication tools to prevent burnout.</p>
      
      <h2>Best Practices for Hybrid Teams</h2>
      <ul>
        <li><strong>Digital First Documentation:</strong> If it's not written down, it didn't happen. Strong documentation prevents information silos.</li>
        <li><strong>Core Working Hours:</strong> Establishing overlapping hours where everyone is online, regardless of their time zone, ensures seamless collaboration.</li>
        <li><strong>Intentional In-Person Gatherings:</strong> When teams do meet in person, the focus should be on relationship building and creative brainstorming, rather than tasks that could be done independently.</li>
      </ul>
      
      <p>As we move deeper into this decade, hybrid work is no longer a "perk" but a baseline expectation. Companies that fail to master this model will struggle to retain top talent.</p>
    `
  },
  {
    id: 3,
    title: "Top 5 Soft Skills Employers Look For in 2026",
    excerpt: "Technical skills get you the interview, but soft skills get you the job. Here's what hiring managers want.",
    category: "Career Advice",
    date: "Jul 15, 2026",
    image: hrImage,
    author: "Zarvion HR Advisory",
    content: `
      <h2>1. Adaptive Problem Solving</h2>
      <p>Employers aren't just looking for candidates who know the answers; they want candidates who know how to find the answers when the parameters change. This involves critical thinking and the ability to pivot strategies quickly.</p>
      
      <h2>2. Cross-Functional Communication</h2>
      <p>Developers must be able to explain complex technical constraints to non-technical stakeholders, such as product managers or marketing teams, without using overwhelming jargon.</p>
      
      <h2>3. Emotional Intelligence (EQ)</h2>
      <p>High EQ enables professionals to navigate workplace conflicts gracefully, receive constructive feedback without defensiveness, and foster a supportive team environment.</p>
      
      <h2>4. Continuous Learning</h2>
      <p>The half-life of technical skills is getting shorter. A demonstrable eagerness to learn new paradigms and tools shows employers that a candidate is a long-term investment.</p>
      
      <h2>5. Remote Collaboration</h2>
      <p>With distributed teams being the norm, the ability to collaborate effectively through digital mediums—knowing when to jump on a call versus when to send a Slack message—is a highly sought-after competency.</p>
    `
  }
];

export const BLOG_POSTS = [
  {
    id: 4,
    title: "Optimizing Your LinkedIn Profile for Recruiter Search",
    excerpt: "Simple tweaks to your profile that will dramatically increase your visibility to top tech recruiters.",
    category: "Career Advice",
    date: "Jul 02, 2026",
    image: socialImage,
    author: "Zarvion Placement Team",
    content: `
      <h2>The Power of the Headline</h2>
      <p>Your headline defaults to your current job title, but it shouldn't. It should be a highly searchable value proposition. Instead of "Software Engineer at XYZ," use "Senior Full Stack Developer | React & Node.js | Building Scalable Cloud Architecture."</p>
      
      <h2>The Featured Section</h2>
      <p>Don't just tell recruiters what you can do—show them. Utilize the "Featured" section to link to your GitHub repositories, live projects, published articles, or slide decks from talks you've given.</p>
      
      <h2>Strategic Keyword Placement</h2>
      <p>Recruiters use LinkedIn Recruiter, a premium tool that functions much like a search engine. Ensure the technologies you excel in are naturally woven into your Summary and Experience sections. Don't keyword stuff, but do be comprehensive.</p>
      <p>By treating your LinkedIn profile as an active landing page rather than a passive resume, you dramatically increase the likelihood of being contacted for roles that perfectly align with your career trajectory.</p>
    `
  },
  {
    id: 5,
    title: "The Rise of Cybersecurity Roles",
    excerpt: "Why cybersecurity is the fastest growing sector in IT and how to transition into the field.",
    category: "Industry Trends",
    date: "Jun 18, 2026",
    image: cyberImage,
    author: "Zarvion Tech Experts",
    content: `
      <h2>Why the Boom?</h2>
      <p>Data is the new oil, and protecting it is paramount. With strict regulatory frameworks like GDPR and CCPA enforcing massive fines for data breaches, companies view cybersecurity not as an IT expense, but as critical business insurance.</p>
      
      <h2>Transitioning into Cyber</h2>
      <p>For those looking to transition into this lucrative field, a traditional computer science degree isn't always the only path. Many successful analysts start in systems administration or network engineering. Consider the following steps:</p>
      <ul>
        <li><strong>Certifications:</strong> Obtain foundational certs like Security+, CEH, or eventually CISSP.</li>
        <li><strong>Hands-on Practice:</strong> Utilize platforms like Hack The Box or TryHackMe to gain practical experience.</li>
        <li><strong>Stay Informed:</strong> The threat landscape changes daily. Subscribe to industry newsletters and follow major security researchers to stay ahead of the curve.</li>
      </ul>
    `
  },
  {
    id: 6,
    title: "Mastering the Technical Interview",
    excerpt: "A comprehensive guide to passing coding assessments and systems design rounds.",
    category: "Interview Prep",
    date: "Jun 05, 2026",
    image: interviewImage,
    author: "Zarvion Advisory",
    content: `
      <h2>Deconstructing the Coding Assessment</h2>
      <p>Data structures and algorithms form the backbone of these assessments. Instead of blindly memorizing LeetCode solutions, focus on recognizing patterns—such as Sliding Window, Two Pointers, or Depth-First Search. When you recognize the pattern, the implementation becomes straightforward.</p>
      
      <h2>The Art of Systems Design</h2>
      <p>For mid-to-senior roles, the systems design round is often more important than the coding round. Interviewers want to see how you handle ambiguity, scale, and trade-offs. Always start by clarifying requirements, defining the APIs, and drawing a high-level architecture before diving into database schemas and caching strategies.</p>
      
      <h2>Communication is Key</h2>
      <p>A silent candidate is a failing candidate. Talk through your thought process. If you hit a roadblock, explain exactly what you are stuck on. Interviewers want to see how you collaborate and solve problems, not just if you can produce perfect syntax on the first try.</p>
    `
  }
];
