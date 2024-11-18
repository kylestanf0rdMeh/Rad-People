import styled from 'styled-components';

export const HomeContainer = styled.div`
  background-color: white;
  min-height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow: hidden; // Add this line
`;

export const Hero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const VideoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #1404FB; // This will be visible if there's any gap
`;

export const CenteredText = styled.div`
  font-family: 'Helvetica Neue LT Com', sans-serif;
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-size: 5vw;
  line-height: 1.2;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    font-size: 8vw;
  }

  span {
    white-space: nowrap;
  }
`;

export const ThreeWrapper = styled.div`
  height: 250px;
  margin-bottom: 20px;
  width: 100%;
  overflow: hidden;
  
  @media (min-width: 768px) {
    height: 400px;
    margin-bottom: 40px;
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  
  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

export const Subtitle = styled.p`
  font-size: 16px;
  line-height: 1.5;
  
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;