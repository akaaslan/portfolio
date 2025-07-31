import { useLanguage } from '../hooks/useLanguage';
import '../styles/Profile.css';

const Profile = () => {
  const { data } = useLanguage();

  const getSafeProperty = (obj: unknown, path: string, defaultValue: string = ''): string => {
    const keys = path.split('.');
    let current = obj as Record<string, unknown>;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key] as Record<string, unknown>;
      } else {
        return defaultValue;
      }
    }
    
    return typeof current === 'string' ? current : defaultValue;
  };

  return (
    <section id="profile" className="profile-section" aria-labelledby="profile-title">
      <div className="profile-container">
        <h2 id="profile-title" className="section-title">
          {getSafeProperty(data, 'profile.title', 'Profile')}
        </h2>
        
        <div className="profile-content">
          <div className="profile-info">
            <h3 className="profile-subtitle">{getSafeProperty(data, 'profile.sections.profile', 'Profile')}</h3>
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">{getSafeProperty(data, 'profile.labels.dateOfBirth', 'Date of Birth')}</span>
                <span className="detail-value">{getSafeProperty(data, 'profile.data.dateOfBirth', '31.07.2002')}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{getSafeProperty(data, 'profile.labels.cityOfResidence', 'City')}</span>
                <span className="detail-value">{getSafeProperty(data, 'profile.data.cityOfResidence', 'İstanbul, Avcılar')}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{getSafeProperty(data, 'profile.labels.educationStatus', 'Education')}</span>
                <span className="detail-value">{getSafeProperty(data, 'profile.data.educationStatus', 'Computer Science')}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{getSafeProperty(data, 'profile.labels.preferredRole', 'Role')}</span>
                <span className="detail-value">{getSafeProperty(data, 'profile.data.preferredRole', 'Fullstack Developer')}</span>
              </div>
            </div>
          </div>

          <div className="about-me">
            <h3 className="profile-subtitle">{getSafeProperty(data, 'profile.sections.aboutMe', 'About Me')}</h3>
            <p className="about-text">
              {getSafeProperty(data, 'profile.aboutText', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;