import { Redirect, Route, Switch } from "react-router-dom";
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
	addCircleOutline,
	chatbubbleOutline,
	homeOutline,
	personOutline,
	searchOutline,
} from "ionicons/icons";
import { useEffect, useState } from 'react';
import { auth } from './firebase-config';

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "./theme/variables.css";
import "./styles.css";

/* Pages */
import HomePage from "./pages/HomePage";
import ChatsPage from "./pages/ChatsPage";
import ProfilePage from "./pages/ProfilePage";
import DisclaimerPage from "./pages/DisclaimerPage";
import DisclaimerBookingPage from "./pages/DisclaimerBookingPage";
import GamesList from "./components/GamesList";
import EditPage from "./pages/EditPage";
import CreatePage4 from "./pages/CreatePage4";
import SearchPage from "./pages/SearchPage";
import LogIn from "./pages/LogIn";

setupIonicReact();

const App: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setIsAuthenticated(!!user);
		});
	}, []);

	return (
		<IonApp>
			<IonReactRouter>
				{isAuthenticated ? (
					<IonTabs>
						<IonRouterOutlet>
							<Switch>
								<Route exact path="/home" component={HomePage} />
								<Route exact path="/search" component={SearchPage} />
								<Route path="/create" component={CreatePage4} />
								<Route path="/chats" component={ChatsPage} />
								<Route path="/profile" component={ProfilePage} />
								{/* Uncomment and add your GameDetailsPage if needed
                                <Route path="/gamedetails/:id" component={GameDetailsPage} /> */}
								<Route path="/games" component={GamesList} />
								<Route path="/games/:gameId" component={EditPage} />
								<Route path="/editpage" component={EditPage} />
								<Route path="/disclaimer" component={DisclaimerPage} />
								<Route path="/disclaimerbookingpage" component={DisclaimerBookingPage} />
								<Route path="/create3" component={CreatePage4} />
								<Redirect from="/" to="/home" />
							</Switch>
						</IonRouterOutlet>
						<IonTabBar slot="bottom">
							<IonTabButton tab="home" href="/home">
								<IonIcon icon={homeOutline} />
								<IonLabel>Home</IonLabel>
							</IonTabButton>
							<IonTabButton tab="search" href="/search">
								<IonIcon icon={searchOutline} />
								<IonLabel>Search</IonLabel>
							</IonTabButton>
							<IonTabButton tab="create" href="/disclaimer">
								<IonIcon icon={addCircleOutline} />
								<IonLabel>Create</IonLabel>
							</IonTabButton>
							<IonTabButton tab="chats" href="/chats">
								<IonIcon icon={chatbubbleOutline} />
								<IonLabel>Chats</IonLabel>
							</IonTabButton>
							<IonTabButton tab="profile" href="/profile">
								<IonIcon icon={personOutline} />
								<IonLabel>Profile</IonLabel>
							</IonTabButton>
						</IonTabBar>
					</IonTabs>
				) : (
					<LogIn />
				)}
			</IonReactRouter>
		</IonApp>
	);
};

export default App;
