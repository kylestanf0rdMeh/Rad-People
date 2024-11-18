import React from 'react';
import { VideoWrapper, StyledVideo } from '../styles/HomeStyles';
import landingVideo1 from '../assets/radpeople-landingPage.mp4';
import landingVideoMobile from '../assets/landingVideo-mobile.mp4';

const VideoBackground: React.FC = () => {
  return (
    <VideoWrapper>
      <StyledVideo autoPlay loop muted playsInline>
        <source src={landingVideo1} type="video/mp4" media="(min-width: 768px)" />
        <source src={landingVideoMobile} type="video/mp4" media="(max-width: 767px)" />
        Your browser does not support the video tag.
      </StyledVideo>
    </VideoWrapper>
  );
};

export default VideoBackground;