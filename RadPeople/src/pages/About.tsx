import styled from 'styled-components';

import { useDataFetching } from '../hooks/useDataFetching';
import { fetchTalent } from '../middleware/Talent';
import { fetchAbout } from '../middleware/About';
import { TalentItem } from '../models/Talent.model';
import { AboutItem } from '../models/About.model';
import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import useWindowDimensions from '../hooks/useWindowDimensions';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: -2rem;
  margin-top: -1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 2rem;
    gap: 1rem;
    align-items: stretch;
  }
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

const ProfileWrapper = styled.div<{ imgWidth: number; imgHeight: number }>`
  position: fixed;
  top: 2.55rem;
  right: 0rem;
  width: ${({ imgWidth }) => `${imgWidth}px`};
  max-width: 350px;
  z-index: 1000;
  pointer-events: none;
`;

const ProfilePreview = styled.img<{ imgHeight: number }>`
  display: block;
  width: 100%;
  object-fit: contain;
  border: none;
`;

const ProfileBio = styled.div<{ imgWidth: number }>`
  width: 100%;
  color: black;
  background: white;
  font-family: 'Helvetica Neue LT Com', sans-serif;
  font-size: ${({ imgWidth }) => `clamp(0.7rem, ${imgWidth / 18}px, 0.9rem)`};
  line-height: 1.3;
  border: none;
  padding: 0.5rem 0 0 0;
  text-transform: none;
  margin-left: 0.1rem;
  margin-right:0.1rem;
`;

const About: React.FC = () => {
  const { data: talent } = useDataFetching<TalentItem[]>('talent', fetchTalent);
  const { data: about } = useDataFetching<AboutItem[]>('about', fetchAbout);
  const { width: windowWidth } = useWindowDimensions();
  const [hoveredTalent, setHoveredTalent] = useState<TalentItem | null>(null);
  const [selectedTalentId, setSelectedTalentId] = useState<string | null>(null);
  const selectedTalent = talent?.find(t => t.sys.id === selectedTalentId) || null;
  const profileToShow = hoveredTalent || selectedTalent;

  const imgWidth = Math.min(windowWidth * 0.2, 350);
  const imgHeight = imgWidth;


  return (
    <PageWrapper>
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
          <ProfileWrapper imgWidth={imgWidth} imgHeight={imgHeight}>
            <ProfilePreview
              src={profileToShow.fields.profilePicture.fields.file.url}
              alt={`${profileToShow.fields.firstName} ${profileToShow.fields.lastName}`}
              imgHeight={imgHeight}
            />
            <ProfileBio imgWidth={imgWidth}>
              {profileToShow.fields.bio}
            </ProfileBio>
          </ProfileWrapper>
        )}
      </Container>
    </PageWrapper>
  );
};

export default About