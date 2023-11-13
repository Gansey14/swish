import { Redirect, Route } from "react-router-dom";
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
import SearchPage from "./pages/SearchPage";
import CreatePage from "./pages/CreatePage";
import ChatsPage from "./pages/ChatsPage";
import ProfilePage from "./pages/ProfilePage";
import DisclaimerPage from "./pages/DisclaimerPage";
import DisclaimerBookingPage from "./pages/DisclaimerBookingPage";
import GameDetailsPage from "./pages/GameDetailsPage";
import { GameInfo } from "../src/components/CardNextGame";
import CreatePage2 from "./pages/CreatePage2";
import CreatePage3 from "./pages/CreatePage3";
import GamesList from "./components/GamesList";
import EditPage from "./pages/EditPage";
import SearchPageV2 from "./pages/SearchPageV2";
import CreatePage4 from "./pages/CreatePage4";
import { SearchInfo } from "./components/CardSearchGame";

setupIonicReact();

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonTabs>
				<IonRouterOutlet>
					{/* Routing the path of /home to the home page */}
					<Route
						exact
						path="/home"
					>
						<HomePage />
					</Route>
					{/* Routing the path of /search to the search page */}
					<Route
						exact
						path="/search"
					>
						<SearchPageV2
							id={""}
							gameName={""}
							skillLevel={""}
							gameDescription={""}
							court={{
								courtName: "",
								location: "",
								courtType: "Indoor",
								id: "",
							}}
							gameSize={0}
							time={""}
							ball={false}
							pump={false}
						/>
					</Route>
					{/* Routing the path of /create to the create page */}
					<Route path="/create">
						<CreatePage4 />
					</Route>
					{/* Routing the path of /chats to the chats page */}
					<Route path="/chats">
						<ChatsPage />
					</Route>
					{/* Routing the path of /profile to the profile page */}
					<Route path="/profile">
						<ProfilePage />
					</Route>
					{/* Routing the path of /gamedetails to the profile page */}
					{/* <Route path="/gamedetails/:id">
						<GameDetailsPage games={ } />
					</Route> */}
					<Route path="/games">
						<GamesList />
					</Route>
					<Route path="/games/:gameId">
						<EditPage />
					</Route>

					{/* Routing the path of /editpage to render the game in the edit page */}
					<Route path="/editpage">
						<EditPage />
					</Route>
					{/* Routing the path of /disclaimer to the first disclaimer page in create game creation */}
					<Route path="/disclaimer">
						<DisclaimerPage />
					</Route>
					{/* Routing the path of /disclaimerbookingpag to the disclaimer about booking the gym */}
					<Route path="/disclaimerbookingpage">
						<DisclaimerBookingPage />
					</Route>

					{/* Routing the path of /disclaimerbookingpag to the disclaimer about booking the gym */}
					<Route path="/create3">
						<CreatePage4 />
					</Route>

					{/* Routing an emoty path of / to the home page */}
					<Route
						exact
						path="/"
					>
						<Redirect to="/home" />
					</Route>
				</IonRouterOutlet>
				<IonTabBar slot="bottom">
					<IonTabButton
						tab="home"
						href="/home"
					>
						<IonIcon
							aria-hidden="true"
							icon={homeOutline}
						/>
						<IonLabel>Home</IonLabel>
					</IonTabButton>
					<IonTabButton
						tab="search"
						href="/search"
					>
						<IonIcon
							aria-hidden="true"
							icon={searchOutline}
						/>
						<IonLabel>Search</IonLabel>
					</IonTabButton>
					<IonTabButton
						tab="create"
						href="/disclaimer"
					>
						<IonIcon
							aria-hidden="true"
							icon={addCircleOutline}
						/>
						<IonLabel>Create</IonLabel>
					</IonTabButton>
					<IonTabButton
						tab="chats"
						href="/chats"
					>
						<IonIcon
							aria-hidden="true"
							icon={chatbubbleOutline}
						/>
						<IonLabel>Chats</IonLabel>
					</IonTabButton>
					<IonTabButton
						tab="profile"
						href="/profile"
					>
						<IonIcon
							aria-hidden="true"
							icon={personOutline}
						/>
						<IonLabel>Profile</IonLabel>
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>
	</IonApp>
);

export default App;
