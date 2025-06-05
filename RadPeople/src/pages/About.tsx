import styled from 'styled-components';

// Dummy data for names
const dummyNames = [
  "Alex Smith",
  "Jordan Lee",
  "Taylor Kim",
  "Morgan Ray",
  "Casey Drew"
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 80vh;
  padding-left: 5rem;
  padding-top: 5rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-left: 1rem;
    padding-top: 2rem;
    gap: 1rem;
    align-items: stretch;
  }
`;

const InfoBox = styled.div`
  border: 1px solid black;
  background: white;
  color: black;
  padding: 2rem;
  min-width: 100vh;
  max-width: 150vh;
  font-family: 'Sequel Sans Regular', sans-serif;
  font-size: 1.3rem;
  line-height: 1.6;
`;

const NamesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: 'Sequel Sans Regular', sans-serif;
  color: black;
  margin-top: 2rem;
  margin-left: 0;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  gap: 0.1rem;
  text-transform: uppercase;
`;

const About: React.FC = () => {
  return (
    <Container>
      <InfoBox>
        RADPEOPLE is a creative agency and cultural studio based in Austin, TX.<br /><br />
        We concept, produce, and activate work at the intersection of fashion, art, music, and experience. From immersive events to brand collaborations, we build moments that move with culture.<br /><br />
        Our practice is multidisciplinary. We operate across event production, creative direction, brand strategy, PR, and design—guided by narrative, precision, and point of view.<br /><br />
        We collaborate with artists, brands, and communities to create work that feels present, intentional, and alive.
      </InfoBox>
      <NamesList>
        {dummyNames.map((name, idx) => (
          <li key={idx}>{name}</li>
        ))}
      </NamesList>
    </Container>
  );
};

export default About