// Paolo
// Card used to display your next game on the homescreen
import React from "react";
import { useHistory } from "react-router";
import "./CardNextGame.css";
import {
	IonCard,
	IonCardContent,
	IonCardTitle,
	IonItem,
	IonLabel,
	IonAvatar,
	IonImg,
	IonChip,
	IonIcon,
} from "@ionic/react";
import {
	checkmarkDoneCircle,
	peopleOutline,
	pinOutline,
	timeOutline,
} from "ionicons/icons";

export type GameInfo = {
	id: string;
	gameName: string;
	skillLevel: string;
	gameDescription: string;
	court: {
		courtImage: string;
		location: string;
		gameType: "Indoor" | "Outdoor";
	};
	gameSize: any;
	availableSpots: number;
	time: string;
	organiser: {
		image: string;
		name: string;
	};
};

type CardNextGameProps = {
	gameInfo: GameInfo;
};

const CardNextGame: React.FC<CardNextGameProps> = ({ gameInfo }) => {
	// useHistory used to push url, instead of useNavigate
	const history = useHistory();
	const handleCardClick = () => {
		history.push(`/gamedetails/${gameInfo.id}`);
	};

	// Was used to calculate number of people joined game
	// const numberOfPeople = gameInfo.gameSize - gameInfo.availableSpots;
	// const numberOfOthers = numberOfPeople - 1;
	return (
		<IonCard
			className="ion-card-click"
			onClick={handleCardClick}
		>
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
						{gameInfo.court.gameType}
					</IonChip>
					<IonChip
						className="custom-chip"
						color="secondary"
						outline={true}
					>
						{gameInfo.skillLevel}
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
						{`${gameInfo.availableSpots}`}
					</IonChip>
				</IonItem>

				<IonItem lines="full">
					<IonCardTitle>{gameInfo.gameName}</IonCardTitle>
				</IonItem>

				<IonItem lines="none">
					<IonIcon
						className="label-icon"
						aria-hidden="true"
						icon={timeOutline}
						slot="start"
					></IonIcon>
					<IonLabel className="time-label">{gameInfo.time}</IonLabel>
				</IonItem>
				<IonItem lines="full">
					<IonIcon
						className="label-icon"
						aria-hidden="true"
						icon={pinOutline}
						slot="start"
					></IonIcon>
					<IonLabel>{gameInfo.court.location}</IonLabel>
				</IonItem>
				<IonItem lines="full">
					<IonAvatar slot="start">
						<IonImg src={gameInfo.organiser.image} />
					</IonAvatar>
					<IonLabel>
						<p className="label-p">
							<strong>Game Organizer</strong>
						</p>
						<p className="label-p">@{gameInfo.organiser.name}</p>
					</IonLabel>
				</IonItem>
				<IonItem lines="none">
					<IonIcon
						className="label-icon"
						aria-hidden="true"
						color="success"
						icon={checkmarkDoneCircle}
						slot="start"
					></IonIcon>
					<IonLabel color="success">Double confirmation</IonLabel>
				</IonItem>
			</IonCardContent>
		</IonCard>
	);
};

export default CardNextGame;
