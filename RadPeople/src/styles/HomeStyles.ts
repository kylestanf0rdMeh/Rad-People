import styled from 'styled-components';

export const HomeContainer = styled.div`
  background-color: #1404FB;
  min-height: 100vh;
  color: white;
`;

export const Hero = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding: 0 20px;
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