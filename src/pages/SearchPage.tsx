import React, { useState, useEffect } from "react";
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonSearchbar,
	IonItem,
	IonLabel,
	IonSelect,
	IonSelectOption,
	IonList,
} from "@ionic/react";
import "./SearchPage.css";
import CardSearchGame, { SearchInfo } from "../components/CardSearchGame";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

// Samuel, Jarl, Paolo - Paolo created a function which allowed us to list all the items. Samuel put it inside the page and adjusted the code so it works. Jarl started the search and filtering and Samuel finished the functionality.

const SearchPageV2: React.FC<SearchInfo> = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filter, setFilter] = useState("");
	const [games, setGames] = useState<SearchInfo[]>([]);
	const gamesCollectionRef = collection(db, "games");
	const [filteredGames, setFilteredGames] = useState<SearchInfo[]>([]);

	useEffect(() => {
		// function to list fetch games object from firebase
		const getGames = async () => {
			try {
				const data = await getDocs(gamesCollectionRef);
				setGames(data.docs.map((doc) => ({ ...(doc.data() as SearchInfo), id: doc.id })));
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};

		getGames();
	}, []);

	// implementing filtering option with the help of chatGPT

	useEffect(() => {
		const filtered = games.filter((game) => {
			const gameNameLower = game.gameName ? game.gameName.toLowerCase() : "";
			return (
				gameNameLower.includes(searchTerm.toLowerCase()) &&
				(filter === "" || game.court.courtType === filter)
			);
		});
		setFilteredGames(filtered);
	}, [searchTerm, filter, games]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Search</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonSearchbar
					value={searchTerm}
					debounce={300}
					onIonChange={(e) => setSearchTerm(e.detail.value ?? "")}
					placeholder="Search for Games"
				></IonSearchbar>

				<IonItem>
					<IonLabel>Game Type</IonLabel>
					<IonSelect
						value={filter}
						placeholder="Select Type"
						onIonChange={(e) => setFilter(e.detail.value)}
					>
						<IonSelectOption value="">All</IonSelectOption>
						<IonSelectOption value="Indoor">Indoor</IonSelectOption>
						<IonSelectOption value="Outdoor">Outdoor</IonSelectOption>
					</IonSelect>
				</IonItem>
				{/* mapping through the the filtered games and displaying each game from database */}
				<IonList>
					{filteredGames.map((game) => (
						<CardSearchGame
							searchInfo={game}
							key={game.id}
						/>
					))}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default SearchPageV2;
