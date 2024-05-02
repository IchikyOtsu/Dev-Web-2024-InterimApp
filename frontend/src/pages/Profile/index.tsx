import Profile from "../../Components/Profile/index";

const ProfilePage = () => {
	const profileData = {
		name: "John Doe",
		bio: "Software Developer with a passion for learning new technologies.",
		profilePicture: "../../src/assets/avatar.jpg",
	};

	return (
		<div style="display: flex; justify-content: center;">
			<Profile {...profileData} />
		</div>
	);
};

export default ProfilePage;
