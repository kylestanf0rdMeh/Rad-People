import styled from 'styled-components';

import { useDataFetching } from '../hooks/useDataFetching';
import { fetchTalent } from '../middleware/Talent';
import { fetchAbout } from '../middleware/About';
import { TalentItem } from '../models/Talent.model';
import { AboutItem } from '../models/About.model';
import { useState } from 'react';
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

const NameItem = styled.li`
  transition: color 0.2s;
  cursor: pointer;
`;

const ProfileWrapper = styled.div<{ imgWidth: number; imgHeight: number }>`
  position: fixed;
  top: 2.55rem;
  right: 0rem;
  margin-right: -2.25rem;
  width: ${({ imgWidth }) => `${imgWidth}px`};
  z-index: 1000;
  pointer-events: none;
`;
const ProfilePreview = styled.img<{ imgWidth: number; imgHeight: number }>`
  position: fixed;
  top: 2.55rem;
  right: 0rem;
  margin-right: -2.25rem;
  width: ${({ imgWidth }) => imgWidth}px;
  height: ${({ imgHeight }) => imgHeight}px;
  max-width: 350px;
  max-height: 350px;
  object-fit: contain;
  z-index: 1000;
  border: none;
  pointer-events: none;
`;

const ProfileBio = styled.div<{ imgWidth: number; imgHeight: number }>`
  position: fixed;
  top: ${({ imgHeight }) => `calc(1.5rem + ${imgHeight}px + 1rem)`};
  right: 0.5rem;
  width: ${({ imgWidth }) => `${imgWidth * 0.7}px`}; // 92% of image width, scales with image
  /* Remove max-width so it always matches the image width */
  color: black;
  background: white;
  font-family: 'Helvetica Neue LT Com', sans-serif;
  font-size: ${({ imgWidth }) => `clamp(0.7rem, ${imgWidth / 18}px, 0.8rem)`};
  line-height: 1.3;
  z-index: 1000;
  border: none;
  pointer-events: none;
  padding: 0.5rem 0 0 0;
  text-transform: none;
`;

const About: React.FC = () => {
  const { data: talent } = useDataFetching<TalentItem[]>('talent', fetchTalent);
  const { data: about } = useDataFetching<AboutItem[]>('about', fetchAbout);
  const { width: windowWidth } = useWindowDimensions();

  const imgWidth = Math.min(windowWidth * 0.2, 350);
  const imgHeight = imgWidth;

  const [hoveredTalent, setHoveredTalent] = useState<TalentItem | null>(null);

  return (
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
            onMouseEnter={() => setHoveredTalent(person)}
            onMouseLeave={() => setHoveredTalent(null)}
          >
            {person.fields.firstName} {person.fields.lastName}
          </NameItem>
        ))}
      </NamesList>
      {hoveredTalent && hoveredTalent.fields.profilePicture?.fields?.file?.url && (
        <>
          <ProfilePreview
            src={hoveredTalent.fields.profilePicture.fields.file.url}
            alt={`${hoveredTalent.fields.firstName} ${hoveredTalent.fields.lastName}`}
            imgWidth={imgWidth}
            imgHeight={imgHeight}
          />
          <ProfileBio imgWidth={imgWidth} imgHeight={imgHeight}>
            {hoveredTalent.fields.bio}
          </ProfileBio>
        </>
      )}
    </Container>
  );
};

export default About