import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const TopMenuContainer = styled.div<{ clickable?: boolean }>`
  width: 100vw;
  height: 40px;
  background: #fff;
  border-bottom: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.4rem;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const TopMenuLabel = styled.div`
  font-family: 'Helvetica Neue LT Com', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #000;
  margin-top: 0.2rem;
`;

const DropdownIcon = styled.span`
  font-size: 0.6rem;
  display: flex;
  align-items: center;
  color: #000;
  padding: 0;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  margin-top: 0.1rem;
`;

const DropdownContent = styled.div<{ open: boolean }>`
  width: 100vw;
  background: #fff;
  border-bottom: ${props => props.open ? '1px solid #000' : 'none'};
  box-sizing: border-box;
  padding: ${props => props.open ? '1rem 1.5rem' : '0 1.5rem'};
  font-family: 'Helvetica Neue LT Com', sans-serif;
  font-size: 0.95rem;
  color: #222;
  max-height: ${props => props.open ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4,0,0.2,1), padding 0.3s cubic-bezier(0.4,0,0.2,1), border-bottom 0.3s;
`;


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
  max-width: 100%;
  min-width: 0;
  height: 100%;
  color: black;
  background: white;
  font-family: 'Helvetica Neue LT Com', sans-serif;
  font-size: clamp(0.4rem, 1.7vw, 0.6rem);
  line-height: 1.3;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 1rem 0 1rem;
  box-sizing: border-box;
  cursor: pointer;
  overflow-wrap: break-word;
  word-break: break-word;
  overflow-y: auto;
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
  aboutUs?: string;
}


const TopMenu: React.FC<{ aboutUs?: string }> = ({ aboutUs }) => {
  const [open, setOpen] = useState(true);

  // For accessibility: handle Enter/Space key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setOpen(o => !o);
    }
  };

  return (
    <>
      <TopMenuContainer
        clickable
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-label="Expand About Us"
        onClick={() => setOpen(o => !o)}
        onKeyDown={handleKeyDown}
      >
        <TopMenuLabel>About Us</TopMenuLabel>
        <DropdownIcon>
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </DropdownIcon>
      </TopMenuContainer>
      <DropdownContent open={open}>
        {aboutUs}
      </DropdownContent>
    </>
  );
};

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, ease: [0.42, 0, 0.58, 1] } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: [0.42, 0, 0.58, 1] } }
};

const TalentCardList: React.FC<TalentCardProps> = ({ talents, aboutUs }) => {
  return (
    <>
      <TopMenu aboutUs={aboutUs} />
      <TalentGrid>
        {talents.map((talent) => (
          <TalentCardWithBio key={talent.sys.id} talent={talent} />
        ))}
      </TalentGrid>
    </>
  );
};

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
              variants={fadeVariants as any}
              onClick={() => setShowBio(true)}
            />
          ) : (
            <TalentBio
              key="bio"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeVariants as any}
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