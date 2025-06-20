import styled from 'styled-components';

import { useDataFetching } from '../hooks/useDataFetching';
import { fetchTalent } from '../middleware/Talent';
import { fetchAbout } from '../middleware/About';
import { TalentItem } from '../models/Talent.model';
import { AboutItem } from '../models/About.model';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import PageWrapper from '../components/PageWrapper';
import TalentCardList from '../components/TalentCard';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: -2rem;
  margin-top: -1rem;
`;

const InfoBox = styled.div`
  background: white;
  color: black;
  padding: 2rem;
  margin-left: 0.5rem; // Small margin from the left
  width: 52%; // Always 60% of the page width
  font-family: 'Helvetica Neue LT Com', sans-serif;
  font-size: 0.9rem;
  line-height: 1.4; // Tighter line spacing
  text-transform: uppercase;
`;

const NamesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue LT Com', sans-serif;
  color: black;
  margin-top: 30vh;
  margin-left: 6vh;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  gap: 0.1rem;
  line-height: 1.05;
  text-transform: uppercase;
`;

const NameItem = styled.li<{ selected?: boolean }>`
  transition: color 0.2s, background 0.2s;
  cursor: pointer;
  color: ${({ selected }) => (selected ? '#1404fb' : 'inherit')};
  border-radius: 4px;
`;

const ProfileWrapper = styled.div`
  position: fixed;
  top: 2.55rem;
  right: 0rem;
  width: min(20vw, 350px);   // 20% of viewport width, max 350px
  z-index: 1000;
  pointer-events: none;
`;

const ProfilePreview = styled.img`
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  border: none;
`;

const ProfileBio = styled.div`
  width: 100%;
  color: black;
  background: white;
  font-family: 'Helvetica Neue LT Com', sans-serif;
  font-size: clamp(0.7rem, 2vw, 0.8rem); // Responsive font size
  line-height: 1.3;
  border: none;
  padding: 0.5rem 0rem 0 0rem;  // <-- 1rem left and right padding
  text-transform: none;
`;

const About: React.FC = () => {
  const { data: talent } = useDataFetching<TalentItem[]>('talent', fetchTalent);
  const { data: about } = useDataFetching<AboutItem[]>('about', fetchAbout);
  const [hoveredTalent, setHoveredTalent] = useState<TalentItem | null>(null);
  const [selectedTalentId, setSelectedTalentId] = useState<string | null>(null);
  const selectedTalent = talent?.find(t => t.sys.id === selectedTalentId) || null;
  const profileToShow = hoveredTalent || selectedTalent;

  const isMobile = useMediaQuery({ maxWidth: 840 });



  return (
    <PageWrapper>
      {isMobile ? (
        <TalentCardList talents={talent || []} aboutUs={about && about[0]?.fields.aboutUs || undefined} />      ) : (
        <Container>
          <InfoBox>
            {about && about[0]?.fields.aboutUs}
          </InfoBox>
          <NamesList>
            TEAM
            <br />
            <br />
            {talent && talent.map((person) => (
              <NameItem
                key={person.sys.id}
                selected={selectedTalentId === person.sys.id}
                onClick={() => {
                  setSelectedTalentId(selectedTalentId === person.sys.id ? null : person.sys.id);
                }}
                onMouseEnter={() => setHoveredTalent(person)}
                onMouseLeave={() => setHoveredTalent(null)}
              >
                {person.fields.firstName} {person.fields.lastName}
              </NameItem>
            ))}
          </NamesList>
          {profileToShow && profileToShow.fields.profilePicture?.fields?.file?.url && (
            <ProfileWrapper>
              <ProfilePreview
                src={profileToShow.fields.profilePicture.fields.file.url}
                alt={`${profileToShow.fields.firstName} ${profileToShow.fields.lastName}`}
              />
              <ProfileBio>
                {profileToShow.fields.bio}
              </ProfileBio>
            </ProfileWrapper>
          )}
        </Container>
      )}
    </PageWrapper>
  );
};

export default About