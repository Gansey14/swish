// ChatPage.tsx
import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton } from '@ionic/react';
import { useParams } from 'react-router-dom';

const ChatPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        // Code to send message
        setMessage('');
    };

    return (
        <IonPage>
            <IonContent>
                {/* Display messages */}
                {/* ... */}

                {/* Message input */}
                <IonInput value={message} onIonChange={e => setMessage(e.detail.value!)} />
                <IonButton onClick={sendMessage}>Send</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default ChatPage;
