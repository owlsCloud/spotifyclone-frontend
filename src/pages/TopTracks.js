import React, { useEffect, useState } from "react";
import {
  Loader,
  SectionWrapper,
  TimeRangeButtons,
  TrackList,
} from "../components";
import { getTopTracks } from "../spotify";
import { catchErrors } from "../utils";
const TopTracks = () => {
  const [topTracks, setTopTracks] = useState(null);
  const [activeRange, setActiveRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      const userTopArtist = await getTopTracks(`${activeRange}_term`);
      setTopTracks(userTopArtist.data);
    };

    catchErrors(fetchData());
  }, [activeRange]);
  return (
    <main>
      {topTracks ? (
        <SectionWrapper title="Top Tracks" breadcrumb="true">
          <TimeRangeButtons
            activeRange={activeRange}
            setActiveRange={setActiveRange}
          />
          <TrackList tracks={topTracks.items.slice(0, 10)} />
        </SectionWrapper>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default TopTracks;
