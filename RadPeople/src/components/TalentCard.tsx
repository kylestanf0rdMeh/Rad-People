import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const TalentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100vw;
  gap: 0;
  background-color: #fff;
  padding-bottom: 10rem; /* Add buffer at the bottom */
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TalentImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  cursor: pointer;
`;

const TalentBio = styled(motion.div)`
  width: 100%;
  height: 100%;
  color: black;
  background: white;
  font-family: 'Helvetica Neue LT Com', sans-serif;
  font-size: 0.5rem;
  line-height: 1.3;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 1rem 0 1rem; /* top, right, bottom, left */
  box-sizing: border-box;
  cursor: pointer;
`;

const TalentInfo = styled.div`
  background: #fff;
  border-bottom: 1px solid #000;
  padding: 0.1rem 0;
  margin-top: 0.15rem;
  min-height: 2.2em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const TalentName = styled.div`
  font-family: 'Helvetica Neue LT Com', sans-serif;
  font-size: 0.7rem;
  color: #000;
  text-transform: uppercase;
  text-align: left;
  margin-left: 0.2rem;
  margin-bottom: -0.1em;
  font-weight: 600;
`;

const TalentRole = styled.div`
  font-family: 'Helvetica Neue LT Com', sans-serif;
  font-size: 0.62rem;
  color: #444;
  text-align: left;
  margin-left: 0.23rem;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 0.03em;
  opacity: 0.8;
`;

interface TalentCardProps {
  talents: {
    sys: { id: string };
    fields: {
      firstName: string;
      lastName: string;
      profilePicture: { fields: { file: { url: string } } };
      bio: string;
      role: string;
    };
  }[];
}

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }
};

const TalentCardList: React.FC<TalentCardProps> = ({ talents }) => (
  <TalentGrid>
    {talents.map((talent) => (
      <TalentCardWithBio key={talent.sys.id} talent={talent} />
    ))}
  </TalentGrid>
);

const TalentCardWithBio: React.FC<{ talent: TalentCardProps['talents'][0] }> = ({ talent }) => {
  const [showBio, setShowBio] = useState(false);

  return (
    <TalentCard>
      <ImageWrapper>
        <AnimatePresence mode="wait">
          {!showBio ? (
            <TalentImage
              key="image"
              src={talent.fields.profilePicture.fields.file.url}
              alt={`${talent.fields.firstName} ${talent.fields.lastName}`}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeVariants}
              onClick={() => setShowBio(true)}
            />
          ) : (
            <TalentBio
              key="bio"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeVariants}
              onClick={() => setShowBio(false)}
            >
              {talent.fields.bio}
            </TalentBio>
          )}
        </AnimatePresence>
      </ImageWrapper>
      <TalentInfo>
        <TalentName>
            {talent.fields.firstName} {talent.fields.lastName}
        </TalentName>
        <TalentRole>
            {talent.fields.role}
        </TalentRole>
       </TalentInfo>
    </TalentCard>
  );
};

export default TalentCardList;