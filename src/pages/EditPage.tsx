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
	IonLabel
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { trashBinOutline } from "ionicons/icons";

export interface Court {
	id: string;
	courtImage: string;
	gameType: string;
	location: string;
	courtName: string;
	courtType: string;
}

interface GameState {
	id: string;
	gameName: string;
	gameDescription: string;
	skillLevel: string;
	gameSize: string;
	court: Court | null;
	availableSpots: number;
	time: string;
	equipment: {
		ball: boolean;
		pump: boolean;
	};
}

const EditPage: React.FC = () => {
	const history = useHistory();
	const [game, setGame] = useState<GameState>({
		id: "",
		gameName: "",
		gameDescription: "",
		skillLevel: "",
		gameSize: "",
		court: null,
		availableSpots: 10,
		time: "",
		equipment: {
			ball: true,
			pump: true,
		},
	});
	const [courts, setCourts] = useState<Court[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const url = `https://swish-cc699-default-rtdb.europe-west1.firebasedatabase.app/Courts.json`;
				const response = await fetch(url);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				const loadedCourts = Object.keys(data).map((key) => ({
					id: key,
					...data[key],
				}));
				setCourts(loadedCourts);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};

		fetchData();
	}, []);

	const handleInputChange = (name: keyof GameState, value: any) => {
		setGame({ ...game, [name]: value });
	};

	const handleCheckboxChange = (name: keyof GameState["equipment"]) => {
		setGame({
			...game,
			equipment: { ...game.equipment, [name]: !game.equipment[name] },
		});
	};

	const handleUpdate = async () => {
		const url = `https://swish-cc699-default-rtdb.europe-west1.firebasedatabase.app/games/${game.id}.json`;
		try {
			const response = await fetch(url, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(game),
			});

			if (!response.ok) {
				throw new Error("Failed to update game");
			}

			console.log("Game Updated", game);
			history.push("/search"); // Redirect to another page after updating
		} catch (error) {
			console.error("Error updating game", error);
		}
	};

	const handleDelete = async () => {
		const url = `https://swish-cc699-default-rtdb.europe-west1.firebasedatabase.app/games/${game.id}.json`;
		try {
			const response = await fetch(url, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Failed to delete game");
			}

			console.log("Game Deleted", game);
			history.push("/search"); // Redirect to another page after deleting
		} catch (error) {
			console.error("Error deleting game", error);
		}
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="#"></IonBackButton>
					</IonButtons>
					<IonTitle>Edit Game</IonTitle>
					<div className="progressBar ion-padding-end" slot="end">
						<IonButton fill="clear" size="small" onClick={handleDelete}>
							<IonIcon aria-hidden="true" icon={trashBinOutline}></IonIcon>
						</IonButton>
					</div>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<main>
					<form onSubmit={(e) => e.preventDefault()}>

						{/* Court Selection Dropdown */}
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
									<IonSelectOption key={court.id} value={court.id}>
										{court.courtName}
									</IonSelectOption>
								))}
							</IonSelect>
						</IonItem>
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
							<IonLabel position="stacked">Game Size</IonLabel>
							<IonSelect
								value={game.gameSize}
								onIonChange={(e) => handleInputChange("gameSize", e.detail.value)}
							>
								<IonSelectOption value="1 vs 1">1 vs 1</IonSelectOption>
								<IonSelectOption value="2 vs 2">2 vs 2</IonSelectOption>
								<IonSelectOption value="3 vs 3">3 vs 3</IonSelectOption>
								<IonSelectOption value="4 vs 4">4 vs 4</IonSelectOption>
								<IonSelectOption value="5 vs 5">5 vs 5</IonSelectOption>
							</IonSelect>
						</IonItem>
						<IonItem>
							<IonLabel>Date and Time</IonLabel>
							<IonDatetime
								value={game.time}
								onIonChange={(e) => handleInputChange('time', e.detail.value!)}
							></IonDatetime>
						</IonItem>
						<IonItem>
							<IonLabel>Ball</IonLabel>
							<IonCheckbox
								checked={game.equipment.ball}
								onIonChange={() => handleCheckboxChange('ball')}
							/>
						</IonItem>
						<IonItem>
							<IonLabel>Pump</IonLabel>
							<IonCheckbox
								checked={game.equipment.pump}
								onIonChange={() => handleCheckboxChange('pump')}
							/>
						</IonItem>
					</form>
				</main>
			</IonContent>
			<IonButton expand="block" className="ion-padding" slot="end" onClick={handleUpdate}>
				Save and Update
			</IonButton>
		</IonPage>
	);
};

export default EditPage;
