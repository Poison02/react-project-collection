import React from "react";
import Banner from "./components/Banner";
import Personalized from "./components/Personalized";
import PersonalizedNewSong from "./components/PersonalizedNewSong";

function Home() {
	return (
		<div className="home-wrapper">
			<Banner />
			<Personalized />
			<PersonalizedNewSong />
		</div>
	);
}

export default Home;
