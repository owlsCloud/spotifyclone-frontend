import React, { useEffect, useState } from "react";
import {
  ArtistsGrid,
  Loader,
  SectionWrapper,
  TimeRangeButtons,
} from "../components";
import { getTopArtists } from "../spotify";
import { catchErrors } from "../utils";
const TopArtists = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      const userTopArtist = await getTopArtists(`${activeRange}_term`);
      setTopArtists(userTopArtist.data);
    };

    catchErrors(fetchData());
  }, [activeRange]);
  return (
    <main>
      {topArtists ? (
        <SectionWrapper title="Top artists" breadcrumb="true">
          <TimeRangeButtons
            activeRange={activeRange}
            setActiveRange={setActiveRange}
          />
          <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
        </SectionWrapper>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default TopArtists;
