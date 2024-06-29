import React from "react";
import Banner from "./components/Banner";
import Personalized from "./components/Personalized";
import PersonalizedNewSong from "./components/PersonalizedNewSong";
import LeaderBoard from "./components/LeaderBoard";

function Home() {
	return (
		<div className="home-wrapper">
			<Banner />
			<Personalized />
			<PersonalizedNewSong />
			<LeaderBoard />
		</div>
	);
}

export default Home;
