// Samuel - creating an object with a game and sending it to the database succesful, the objects get listed in the search page afterwards.

import {
	IonButton,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonTextarea,
	IonSelect,
	IonSelectOption,
	IonDatetime,
	IonCheckbox,
	IonItem,
	IonLabel,
	IonModal,
	IonDatetimeButton,
	IonText
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./CreatePage2.css";
import "../styles.css";
import "../theme/variables.css";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useHistory } from "react-router";

// Define a Court interface if you have specific properties for a court
export interface Court {
	id: string;
	gameType: string;
	location: string;
	courtName: string;
}

export interface GameFormState {
	gameName: string;
	gameDescription: string;
	skillLevel: string;
	gameSize: number | null;
	court: Court | null; // Use the Court interface here
	time: string;
	ball: boolean;
	pump: boolean;
}

const CreatePage4: React.FC = () => {
	const [formData, setFormData] = useState<GameFormState>({
		gameName: "",
		gameDescription: "",
		skillLevel: "",
		gameSize: null,
		court: null,
		time: "",
		ball: false,
		pump: false,
	});

	// handling the value with functions which can be then send to database

	const handleInputChange = (name: keyof GameFormState, value: any) => {
		setFormData({ ...formData, [name]: value });
		setFormErrors({ ...formErrors, [name]: false });
	};

	const handleCheckboxChange = (name: "ball" | "pump") => {
		setFormData({
			...formData,
			[name]: !formData[name],
		});
	};

	// Below this is fetching data for displaying courts in dropdown

	const [courts, setCourts] = useState<Court[]>([]);
	const courtsCollectionRef = collection(db, "courts");
	const history = useHistory();

	useEffect(() => {
		// function to list fetch games object from firebase
		const getCourts = async () => {
			try {
				const data = await getDocs(courtsCollectionRef);
				setCourts(data.docs.map((doc) => ({ ...(doc.data() as Court) })));
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};

		getCourts();
	}, []);

	// sending data to the database using arrow function

	const gamesCollectionRef = collection(db, "games");

	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault(); // Prevents default form submission behavior

		// Validation
		const errors = {
			skillLevel: !formData.skillLevel,
			court: !formData.court,
			gameSize: !formData.gameSize,
			time: !formData.time,
		};

		setFormErrors(errors);

		// Check if there are any errors
		const hasErrors = Object.values(errors).some(error => error);
		if (hasErrors) return;

		try {
			const response = await addDoc(gamesCollectionRef, formData);
			history.push('/search');
			// Reset form data and any other required logic after successful submission
			setFormData({
				gameName: "",
				gameDescription: "",
				skillLevel: "",
				gameSize: null,
				court: null,
				time: "",
				ball: false,
				pump: false,
			});
		} catch (error) {
			console.error("Failed to create game:", error);
		}
	};

	// Making dropdowns required before form submition

	const [formErrors, setFormErrors] = useState({
		skillLevel: false,
		court: false,
		gameSize: false,
		time: false,
	});


	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Create Game</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent
				fullscreen
				className="ion-padding"
			>
				<form onSubmit={handleFormSubmit}>
					<IonItem>
						<IonLabel position="stacked">Name of your game</IonLabel>
						<IonTextarea
							required
							autoGrow={true}
							placeholder="E.g. Sunday Basketball"
							value={formData.gameName}
							onIonChange={(e) => handleInputChange("gameName", e.detail.value!)}
						></IonTextarea>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked">Game description</IonLabel>
						<IonTextarea
							required
							placeholder="Any extra information for players can go here."
							autoGrow={true}
							value={formData.gameDescription}
							onIonChange={(e) => handleInputChange("gameDescription", e.detail.value!)}
						></IonTextarea>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked">Skill level</IonLabel>
						<IonSelect
							justify="space-between"
							label="Skill level"
							placeholder="Select"
							value={formData.skillLevel}
							onIonChange={(e) => handleInputChange("skillLevel", e.detail.value)}
						>
							<IonSelectOption value="Beginner">Beginner</IonSelectOption>
							<IonSelectOption value="Casual">Casual</IonSelectOption>
							<IonSelectOption value="Skilled">Skilled</IonSelectOption>
							<IonSelectOption value="Experienced">Experienced</IonSelectOption>
						</IonSelect>
					</IonItem>
					{formErrors.skillLevel && (
						<div className="error-message">
							<IonText color="danger">Please select a skill level</IonText>
						</div>
					)}
					<IonItem>
						{/* fetching data from database to display courts in a dropdown which user can select afterwards */}
						<IonLabel position="stacked">Court</IonLabel>
						<IonSelect
							justify="space-between"
							label="Court"
							placeholder="Select"
							value={formData.court?.id} // Assuming the court object has an id
							onIonChange={(e) =>
								handleInputChange(
									"court",
									courts.find((court) => court.id === e.detail.value)
								)
							}
						>
							{/* user can select the court here */}
							{courts.map((court) => (
								<IonSelectOption
									key={court.id}
									value={court.id}
								>
									{court.courtName} {/* Assuming the court object has a name */}
								</IonSelectOption>
							))}
						</IonSelect>
					</IonItem>
					{formErrors.court && (
						<div className="error-message">
							<IonText color="danger">Please select a court</IonText>
						</div>
					)}
					<IonItem>
						<IonLabel position="stacked">Game size</IonLabel>
						<IonSelect
							justify="space-between"
							label="Game size"
							placeholder="Select"
							value={formData.gameSize}
							onIonChange={(e) => handleInputChange("gameSize", e.detail.value)}
						>
							<IonSelectOption value="2">1 vs 1</IonSelectOption>
							<IonSelectOption value="4">2 vs 2</IonSelectOption>
							<IonSelectOption value="6">3 vs 3</IonSelectOption>
							<IonSelectOption value="8">4 vs 4</IonSelectOption>
							<IonSelectOption value="10">5 vs 5</IonSelectOption>
						</IonSelect>
					</IonItem>
					{formErrors.gameSize && (
						<div className="error-message">
							<IonText color="danger">Please select a game size</IonText>
						</div>
					)}

					<div className="timeAndEquipment">
						<div className="timepickerContainer">
							<strong className="timepickerStrong">Select a date and time</strong>
							<IonDatetime
								value={formData.time}
								onIonChange={(e) => handleInputChange("time", e.detail.value!)}
							></IonDatetime>

							{/* this date picker is not showing up. It seems that it is because of the value in IonDateTime */}

							{/* <IonDatetimeButton datetime="datetime" className="dateButtons"></IonDatetimeButton>
						<IonModal keepContentsMounted={true}>
							<IonDatetime value={formData.time} id="datetime" showDefaultButtons={true} onIonChange={e => handleInputChange('time', e.detail.value!)}></IonDatetime>
						</IonModal> */}
							{formErrors.time && (
								<div className="error-message">
									<IonText color="danger">Please select a date and time</IonText>
								</div>)}
						</div>
						<div>
							<div className="text">
								<strong>Equipment</strong>
								<p>
									Check off equipment you have. Players who join your game will have the
									same option
								</p>
							</div>
							<IonItem>
								<IonLabel>Ball</IonLabel>
								<IonCheckbox
									checked={formData.ball}
									onIonChange={() => handleCheckboxChange("ball")}
								/>
							</IonItem>
							<IonItem>
								<IonLabel>Pump</IonLabel>
								<IonCheckbox
									checked={formData.pump}
									onIonChange={() => handleCheckboxChange("pump")}
								/>
							</IonItem>
						</div>
					</div>
					<IonButton
						className="ion-padding"
						expand="block"
						slot="end"
						type="submit"
					// onClick={handleSaveAndCreate}
					// routerLink="/search"
					>
						Save and Create
					</IonButton>
				</form>
			</IonContent>

		</IonPage>
	);
};

export default CreatePage4;
