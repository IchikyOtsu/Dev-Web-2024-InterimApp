import './index.css'; 
const Profile = ({ name, bio, profilePicture }) => {
  return (
    <div class="profile-card">
      <img src={profilePicture} alt="Profile" class="profile-picture" />
      <h2>{name}</h2>
      <p>{bio}</p>
    </div>
  );
};

export default Profile;
