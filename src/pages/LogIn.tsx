// Import necessary modules
import { IonButton, IonContent, IonPage } from '@ionic/react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const LogIn: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const history = useHistory();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                history.push('/home'); // Redirect to home after successful login
            })
            .catch((error) => {
                console.error("Login failed:", error);
            });
    };

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                history.push('/home'); // Redirect to home if already logged in
            }
        });
    }, [history]);

    return (
        <IonPage>
            <IonContent>
                <IonButton onClick={signInWithGoogle}>
                    Sign in With Google
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default LogIn;
