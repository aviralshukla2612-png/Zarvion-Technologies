import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleCard.css';

const RoleCard = ({ role, isActive }) => {
  const navigate = useNavigate();

  return (
    <div className={`demanded-role-card ${isActive ? 'active' : ''}`}>
      <div 
        className="demanded-card-image" 
        onClick={() => navigate(`/roles/${role.slug}`)}
        role="button" 
        tabIndex={0}
      >
        <img src={role.img} alt={role.title} />
        <div className="demanded-image-overlay"></div>
        <div className="demanded-image-glow"></div>
        <div className="demanded-hover-veil"></div>
        <h3 className="demanded-image-title">{role.title}</h3>
      </div>
    </div>
  );
};

export default RoleCard;