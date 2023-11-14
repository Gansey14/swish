//  Paolo, Samuel - Paolo managed to create the connection in link with a specific game and Samuel managed to display the edit page but failed to update the right object with information - to be done in the upcoming week

import React, { useState, useEffect } from "react";
import {
	IonButton,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonItem,
	IonTextarea,
	IonButtons,
	IonBackButton,
	IonIcon,
	IonSelect,
	IonSelectOption,
	IonDatetime,
	IonCheckbox,
	IonLabel,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { trashBinOutline } from "ionicons/icons";
import { Court } from "./CreatePage4";
import {
	collection,
	addDoc,
	getDocs,
	doc,
	updateDoc,
	deleteDoc,
	getDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { SearchInfo } from "../components/CardSearchGame";

type gameId = {
	gameId: string;
};

const EditPage: React.FC = () => {
	const params = useParams<gameId>();
	const history = useHistory();
	const [game, setGame] = useState<SearchInfo>({
		id: "",
		gameName: "",
		gameDescription: "",
		skillLevel: "",
		gameSize: 10,
		court: {
			id: "",
			courtName: "",
			courtType: "Outdoor",
			location: "",
		}, // Use the Court interface here
		time: "",
		ball: false,
		pump: false,
	});

	// fetching game to populate input fields
	// fetching courts for dropdown
	const specificGameRef = doc(db, "games", params.gameId);
	const [courts, setCourts] = useState<Court[]>([]);
	const courtsCollectionRef = collection(db, "courts");

	useEffect(() => {
		// function to fetch specific game info
		const getGame = async () => {
			try {
				const gameDoc = await getDoc(specificGameRef);
				if (gameDoc.exists()) {
					const gameData = gameDoc.data() as SearchInfo;
					setGame(gameData);
				} else {
					console.error("No game was found");
				}
			} catch (error) {
				console.error("There was an error fetching the game data", error);
			}
		};

		// function to list fetch games object from firebase
		const getCourts = async () => {
			try {
				const data = await getDocs(courtsCollectionRef);
				setCourts(data.docs.map((doc) => ({ ...(doc.data() as Court) })));
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};
		getGame();
		getCourts();
	}, []);

	// updating inputs and checkboxes

	const handleInputChange = (name: keyof SearchInfo, value: any) => {
		setGame({ ...game, [name]: value });
	};

	const handleCheckboxChange = (name: "ball" | "pump") => {
		setGame({
			...game,
			[name]: !game[name],
		});
	};

	// updating games

	const handleUpdate = async () => {
		const gameRef = doc(db, "games", params.gameId);
		await updateDoc(gameRef, {
			gameName: game.gameName,
			gameDescription: game.gameDescription,
			skillLevel: game.skillLevel,
			gameSize: game.gameSize,
			court: game.court,
			time: game.time,
			ball: game.ball,
			pump: game.pump,
		});
		history.push("/search");
	};

	// deleting games

	const handleDelete = async () => {
		const gameRef = doc(db, "games", params.gameId);
		await deleteDoc(gameRef);
		history.push("/search");
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="#"></IonBackButton>
					</IonButtons>
					<IonTitle>Edit Game</IonTitle>
					<div
						className="progressBar ion-padding-end"
						slot="end"
					>
						<IonButton
							fill="clear"
							size="small"
							onClick={handleDelete}
						>
							<IonIcon
								aria-hidden="true"
								icon={trashBinOutline}
							></IonIcon>
						</IonButton>
					</div>
				</IonToolbar>
			</IonHeader>
			<IonContent
				fullscreen
				className="ion-padding"
			>
				<main>
					<form onSubmit={(e) => e.preventDefault()}>
						{/* Court Selection Dropdown */}

						<IonItem>
							<IonLabel position="stacked">Name of your game</IonLabel>
							<IonTextarea
								autoGrow={true}
								placeholder="E.g. Sunday Basketball"
								value={game.gameName}
								onIonChange={(e) => handleInputChange("gameName", e.detail.value!)}
							></IonTextarea>
						</IonItem>
						<IonItem>
							<IonLabel position="stacked">Game description</IonLabel>
							<IonTextarea
								placeholder="Any extra information for players can go here."
								autoGrow={true}
								value={game.gameDescription}
								onIonChange={(e) => handleInputChange("gameDescription", e.detail.value!)}
							></IonTextarea>
						</IonItem>
						<IonItem>
							<IonLabel position="stacked">Skill level</IonLabel>
							<IonSelect
								value={game.skillLevel}
								onIonChange={(e) => handleInputChange("skillLevel", e.detail.value)}
							>
								<IonSelectOption value="Beginner">Beginner</IonSelectOption>
								<IonSelectOption value="Casual">Casual</IonSelectOption>
								<IonSelectOption value="Skilled">Skilled</IonSelectOption>
								<IonSelectOption value="Experienced">Experienced</IonSelectOption>
							</IonSelect>
						</IonItem>
						<IonItem>
							<IonLabel position="stacked">Court</IonLabel>
							<IonSelect
								value={game.court?.id}
								onIonChange={(e) =>
									handleInputChange(
										"court",
										courts.find((court) => court.id === e.detail.value)
									)
								}
							>
								{courts.map((court) => (
									<IonSelectOption
										key={court.id}
										value={court.id}
									>
										{court.courtName}
									</IonSelectOption>
								))}
							</IonSelect>
						</IonItem>
						<IonItem>
							<IonLabel position="stacked">Game Size</IonLabel>
							<IonSelect
								value={game.gameSize}
								onIonChange={(e) => handleInputChange("gameSize", e.detail.value)}
							>
								<IonSelectOption value="2">1 vs 1</IonSelectOption>
								<IonSelectOption value="4">2 vs 2</IonSelectOption>
								<IonSelectOption value="6">3 vs 3</IonSelectOption>
								<IonSelectOption value="8">4 vs 4</IonSelectOption>
								<IonSelectOption value="10">5 vs 5</IonSelectOption>
							</IonSelect>
						</IonItem>
						<IonItem>
							<IonLabel>Date and Time</IonLabel>
							<IonDatetime
								value={game.time}
								onIonChange={(e) => handleInputChange("time", e.detail.value!)}
							></IonDatetime>
						</IonItem>
						<IonItem>
							<IonLabel>Ball</IonLabel>
							<IonCheckbox
								checked={game.ball}
								onIonChange={() => handleCheckboxChange("ball")}
							/>
						</IonItem>
						<IonItem>
							<IonLabel>Pump</IonLabel>
							<IonCheckbox
								checked={game.pump}
								onIonChange={() => handleCheckboxChange("pump")}
							/>
						</IonItem>
					</form>
				</main>
			</IonContent>
			<IonButton
				expand="block"
				className="ion-padding"
				slot="end"
				onClick={handleUpdate}
			>
				Save and Update
			</IonButton>
		</IonPage>
	);
};

export default EditPage;
