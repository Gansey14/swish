//Paolo
//Component that will be rendered on the search page

import React from "react";
import { useHistory } from "react-router";
import "./CardSearchGame.css";
import {
	IonCard,
	IonCardContent,
	IonCardTitle,
	IonItem,
	IonLabel,
	IonChip,
	IonIcon,
	IonButton,
} from "@ionic/react";
import { peopleOutline, pinOutline, timeOutline } from "ionicons/icons";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export type SearchInfo = {
	id: string;
	gameName: string;
	skillLevel: string;
	gameDescription: string;
	court: {
		courtName: string;
		location: string;
		courtType: "Indoor" | "Outdoor";
		id: string;
	};
	gameSize: number;
	time: string;
	ball: boolean;
	pump: boolean;
};

type CardSearchGameProps = {
	searchInfo: SearchInfo;
};

const CardSearchGame: React.FC<CardSearchGameProps> = ({ searchInfo }) => {
	const history = useHistory();

	const navigateToGameDetails = () => {
		history.push(`/games/${searchInfo.id}`);
	};

	return (
		<IonCard className="ion-card-click">
			<IonCardContent>
				<IonItem
					className="tag-container no-margin"
					lines="none"
				>
					<IonChip
						className="custom-chip"
						color="secondary"
						outline={true}
					>
						{searchInfo.court && searchInfo.court.courtType}
					</IonChip>
					<IonChip
						className="custom-chip"
						color="secondary"
						outline={true}
					>
						{searchInfo.skillLevel}
					</IonChip>
					<IonChip
						className="custom-chip"
						color="secondary"
						outline={true}
						slot="end"
					>
						<IonIcon
							className="custom-icon"
							aria-hidden="true"
							icon={peopleOutline}
						/>
						{searchInfo.gameSize}
					</IonChip>
				</IonItem>
				<IonItem lines="full">
					<IonCardTitle>{searchInfo.gameName}</IonCardTitle>
				</IonItem>
				<IonItem lines="none">
					<IonIcon
						className="label-icon"
						aria-hidden="true"
						icon={timeOutline}
						slot="start"
					></IonIcon>
					<IonLabel className="time-label">{searchInfo.time}</IonLabel>
				</IonItem>
				<IonItem lines="full">
					<IonIcon
						className="label-icon"
						aria-hidden="true"
						icon={pinOutline}
						slot="start"
					></IonIcon>
					{/* AND operator used in case the one field is missing */}
					<IonLabel>{searchInfo.court && searchInfo.court.location}</IonLabel>
				</IonItem>
				<div className="card-buttons">
					<IonButton
						className="buttons-split"
						fill="outline"
						onClick={navigateToGameDetails}
						key={searchInfo.id}
					>
						Edit Game
					</IonButton>
					<IonButton className="buttons-split">Share Game</IonButton>
				</div>
			</IonCardContent>
		</IonCard>
	);
};

export default CardSearchGame;
