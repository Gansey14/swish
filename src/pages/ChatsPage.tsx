// ChatsPage.tsx
import React, { useState } from 'react';
import { IonPage, IonContent, IonSelect, IonSelectOption } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const ChatsPage: React.FC = () => {
	// const [selectedUser, setSelectedUser] = useState<string>('');
	// const history = useHistory();
	// const users = [/* array of user objects */];

	// const handleSelectUser = (userId: string) => {
	// 	setSelectedUser(userId);
	// 	history.push(`/chat/${userId}`);
	// };

	return (
		<IonPage>
			<IonContent>
				{/* Dropdown to select user */}
				{/* <IonSelect value={selectedUser} onIonChange={e => handleSelectUser(e.detail.value)}>
					{users.map(user => (
						<IonSelectOption key={user.id} value={user.id}>{user.name}</IonSelectOption>
					))}
				</IonSelect> */}

				{/* List of existing chats */}

			</IonContent>
		</IonPage>
	);
};

export default ChatsPage;