// RadPeople/src/components/TalentCard.tsx
import styled from 'styled-components';

const TalentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100vw;
  gap: 0;
  background-color: #fff;
`;

const TalentCard = styled.div`
  display: flex;
  flex-direction: column;
  aspect-ratio: 0.75/1;
  overflow: hidden;
  border-right: 1px solid #000;
  box-sizing: border-box;

  &:nth-child(2n) {
    border-right: none;
  }
  &:nth-last-child(-n+2) {
    border-bottom: none;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  flex: 1 1 0;
  overflow: hidden;
  border-bottom: 1px solid #000;
`;

const TalentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Fill the area, crop if needed */
  display: block;
`;

const TalentName = styled.div`
  font-family: 'Helvetica Neue LT Com', sans-serif;
  font-size: 0.8rem;
  color: #000;
  text-transform: uppercase;
  text-align: center;
  padding: 0.8rem 0;
  background: #fff;
  min-height: 1.5em;
  max-height: 2.2em;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #000;
`;

interface TalentCardProps {
    talents: {
      sys: { id: string };
      fields: {
        firstName: string;
        lastName: string;
        profilePicture: { fields: { file: { url: string } } };
      };
    }[];
  }

const TalentCardList: React.FC<TalentCardProps> = ({ talents }) => (
  <TalentGrid>
    {talents.map((talent, idx) => (
      <TalentCard key={talent.sys.id}>
        <ImageWrapper>
          <TalentImage
            src={talent.fields.profilePicture.fields.file.url}
            alt={`${talent.fields.firstName} ${talent.fields.lastName}`}
          />
        </ImageWrapper>
        <TalentName>
          {talent.fields.firstName} {talent.fields.lastName}
        </TalentName>
      </TalentCard>
    ))}
  </TalentGrid>
);

export default TalentCardList;