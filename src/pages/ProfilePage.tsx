import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonAvatar, IonLabel } from '@ionic/react';
import { auth } from '../firebase-config';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

const ProfilePage: React.FC = () => {
	const history = useHistory();
	const [user, setUser] = useState(auth.currentUser);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});

		return unsubscribe; // Unsubscribe on unmount
	}, []);

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				history.push('/login'); // Redirect to login page after successful logout
			})
			.catch((error) => {
				console.error("Logout failed:", error);
			});
	};

	return (
		<IonPage>
			<IonContent className="ion-padding">
				{user && (
					<div>
						<IonAvatar style={{ marginBottom: '15px' }}>
							<img src={user.photoURL || 'default-profile-pic-url.jpg'} alt="User Profile" />
						</IonAvatar>
						<IonLabel style={{ marginBottom: '15px' }}>
							{user.displayName || 'Anonymous'}
						</IonLabel>
					</div>
				)}
				<IonButton expand="block" onClick={handleLogout}>
					Log Out
				</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default ProfilePage;
