import { useLanguage } from '../hooks/useLanguage';
import '../styles/Profile.css';

const Profile = () => {
  const { data } = useLanguage();

  return (
    <section id="profile" className="profile-section" aria-labelledby="profile-title">
      <div className="profile-container">
        <h2 id="profile-title" className="section-title">
          {data.profile.title}
        </h2>
        
        <div className="profile-content">
          <div className="profile-info">
            <h3 className="profile-subtitle">{data.profile.sections.profile}</h3>
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">{data.profile.labels.dateOfBirth}</span>
                <span className="detail-value">{data.profile.data.dateOfBirth}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{data.profile.labels.cityOfResidence}</span>
                <span className="detail-value">{data.profile.data.cityOfResidence}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{data.profile.labels.educationStatus}</span>
                <span className="detail-value">{data.profile.data.educationStatus}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{data.profile.labels.preferredRole}</span>
                <span className="detail-value">{data.profile.data.preferredRole}</span>
              </div>
            </div>
          </div>

          <div className="about-me">
            <h3 className="profile-subtitle">{data.profile.sections.aboutMe}</h3>
            <p className="about-text">
              {data.profile.aboutText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;