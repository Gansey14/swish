// Import necessary modules
import { IonButton, IonContent, IonPage } from '@ionic/react';
import { auth, provider, db } from '../firebase-config'; // Assuming db is your Firestore instance
import { signInWithPopup, onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LogIn: React.FC = () => {
    const history = useHistory();

    const updateFirestoreUser = async (user: User | null) => {
        if (user) {
            const userProfileRef = doc(db, 'users', user.uid);

            await setDoc(userProfileRef, {
                name: user.displayName || '',
                email: user.email || '',
                photoURL: user.photoURL || ''
            }, { merge: true });
        }
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                if (result.user) {
                    updateFirestoreUser(result.user);
                    history.push('/home'); // Redirect to home after successful login
                }
            })
            .catch((error) => {
                console.error("Login failed:", error);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                updateFirestoreUser(user);
                history.push('/home'); // Redirect to home if already logged in
            }
        });

        return unsubscribe; // Unsubscribe on unmount
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
