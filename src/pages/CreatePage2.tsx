// Samuel - this was a failed attempt to create a create page

import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonTextarea, IonSelect, IonSelectOption, IonDatetime, IonDatetimeButton, IonModal, IonCheckbox } from "@ionic/react";
import "./CreatePage2.css";
import "../styles.css"
import "../theme/variables.css"
import { addOutline } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import Court from "../components/Court";
import { CourtInfo } from "../components/Court";

const CreatePage2: React.FC = () => {

    // const newGame = {
    //     id: id,
    //     gameName: gameName,
    //     skillLevel: skillLevel,
    //     gameDescription: gameDescription,
    //     court: {},
    //     gameSize: gameSize,
    //     availableSpots: "",
    //     time: time,
    //     organiser: {
    //         image: "",
    //         name: ""
    //     }
    // }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle slot="start">CreatePage</IonTitle>
                    <div className="progressBar ion-padding-end" slot="end">
                        <IonButton fill="outline" size="small" routerLink="/create">1</IonButton>
                        <IonButton color="primary" size="small">2</IonButton>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <main>
                    <div className="subheadingAddcourtContainer">
                        <div className="subheadingContainer">
                            <IonButton color="primary" size="small">2</IonButton>
                            <strong >Add game details</strong>
                        </div>
                    </div>
                    <IonItem>
                        <IonTextarea label="Name of your game" labelPlacement="stacked" placeholder="E.g. Sunday Basketball" autoGrow={true}></IonTextarea>
                    </IonItem>
                    <IonItem>
                        <IonTextarea label="Game description" labelPlacement="stacked" placeholder="Any extra information for players can go here." autoGrow={true}></IonTextarea>
                    </IonItem>
                    <IonItem>
                        <IonSelect justify="space-between" label="Skill level" placeholder="Select">
                            <IonSelectOption value="Beginner">Beginner</IonSelectOption>
                            <IonSelectOption value="Casual">Casual</IonSelectOption>
                            <IonSelectOption value="Professional">Professional</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonSelect justify="space-between" label="Game size" placeholder="Select">
                            <IonSelectOption value="1 vs 1">1 vs 1</IonSelectOption>
                            <IonSelectOption value="2 vs 2">2 vs 2</IonSelectOption>
                            <IonSelectOption value="3 vs 3">3 vs 3</IonSelectOption>
                            <IonSelectOption value="4 vs 4">4 vs 4</IonSelectOption>
                            <IonSelectOption value="5 vs 5">5 vs 5</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <div className="timeAndEquipment">
                        <div className='timepickerContainer'>
                            <strong className='timepickerStrong'>Select a date and time</strong>
                            <IonDatetimeButton className='dateButtons' slot='start' datetime="datetime"></IonDatetimeButton>

                            <IonModal keepContentsMounted={true} >
                                <IonDatetime showDefaultButtons={true} id="datetime"></IonDatetime>
                            </IonModal>
                        </div>
                        <div>
                            <div className="text">
                                <strong>Equipment</strong>
                                <p>Check off equipment you have. Players who join your game will have the same option</p>
                            </div>
                            <IonItem>
                                <IonCheckbox justify="space-between">Ball</IonCheckbox>
                            </IonItem>
                            <IonItem>
                                <IonCheckbox justify="space-between">Pump</IonCheckbox>
                            </IonItem>
                        </div>
                    </div>
                </main>
            </IonContent>
            <IonButton expand="block" className="ion-padding" slot="end" routerLink="/search">
                Save and Create
            </IonButton>
        </IonPage>
    );
};

export default CreatePage2;