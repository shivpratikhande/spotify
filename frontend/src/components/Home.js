import React, { useContext, useEffect, useState } from "react";
import Section from "./Section";
import songContext from "../context/SongContext";

function Home() {
  const context = useContext(songContext);
  const { currentSong, songs } = context;
  const [recommendSongs, setRecommendedSongs] = useState([]);
  useEffect(() => {
    if (currentSong) {
      fetch(`/api/recommend/${currentSong.id}`)
        .then((response) => response.json())
        .then((data) => {
          setRecommendedSongs(data);
        });
    }
  }, [currentSong.id]);

  return (
    <div className="overflow-y-auto h-100 p-4">
      <div className="grid gap-y-8">
        <Section title="Recently Played" items={songs} reverse={true} />

        <Section
          title="Made for you"
          items={recommendSongs && recommendSongs.slice(0, 7)}
        />
      </div>
    </div>
  );
}

export default Home;
