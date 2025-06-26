// RadPeople/src/styles/ClientsStyles.ts
import styled from 'styled-components';

export const ClientNumber = styled.div`
  font-family: 'Helvetica Neue LT Com', sans-serif;
  text-align: right;
  color: black;
  font-size: 1.2rem;
  font-weight: normal;
  line-height: 1.1;
  padding-right: 0;
  padding-top: 0;
  margin-right: 4vh;
  margin-left: 1.2vh;

  @media (min-width: 600px) {
    font-size: 1.2rem;
    margin-top: 0.9rem;
  }
  @media (min-width: 1200px) {
    font-size: 1.4rem;
    margin-right: 10vh;
  }

  @media (max-width: 767px) {
    font-size: 1.3rem; /* Increased for mobile */
    margin-left: 0.3rem;
  }
`;

export const ClientName = styled.div`
  font-family: 'Sequel Sans Regular', 'Sequel Sans', sans-serif;
  font-weight: normal;
  text-transform: uppercase;
  margin: 0;
  line-height: 1.2;
  margin-top: 0.45rem;
  margin-bottom: 0;
  -webkit-text-stroke: 3px black;
  max-width: 72%;
  overflow-wrap: normal;      // Only break at spaces
  word-break: keep-all;       // Never break inside words
  white-space: normal;
  hyphens: none;              // No hyphenation

  @media (min-width: 1251px) {
    font-size: 7rem;
    line-height: 95px;
    margin-bottom: 10px;
  }

  @media (min-width: 991px) and (max-width: 1250px) {
    font-size: 7rem;
    line-height: 95px;
    margin-bottom: 5px;
  }

  @media (min-width: 768px) and (max-width: 990px) {
    font-size: 4rem;
    line-height: 60px;
    margin-bottom: 5px;
  }

  @media (max-width: 767px) {
    font-size: 3rem;
    line-height: 45px;
    margin-bottom: 7px;
    margin-top: -0.5rem;
  }
`;

export const ClientDescription = styled.div`
  font-family: 'Helvetica Neue LT Com', sans-serif;
  margin-left: 0.1rem;
  margin-top: 0;
  text-transform: uppercase;
  margin-bottom: -8px;
  font-size: 0.8rem;
  line-height: 1.1;

  @media (min-width: 600px) {
    font-size: 1.1rem;
    margin-bottom: -6px;
  }
  @media (min-width: 1200px) {
    font-size: 1.4rem;
  }

  @media (max-width: 767px) {
    font-size: 1.3rem;
    margin-bottom: -1rem;
  }
`;

export const ClientCompany = styled.div`
  font-family: 'Helvetica Neue LT Com', sans-serif;
  margin-left: 0.1rem;
  margin-top: 0;
  text-transform: uppercase;
  margin-bottom: 0;
  font-size: 0.8rem;

  @media (min-width: 600px) {
    font-size: 1.1rem;
  }
  @media (min-width: 1200px) {
    font-size: 1.4rem;
  }

  @media (max-width: 767px) {
    font-size: 1.3rem;
    margin-top: -8px;
  }
`;

export const ClientStatus = styled.div`
  font-family: 'Helvetica Neue LT Com', sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
  line-height: 0.9;
  margin: 0;
  padding: 0;
  margin-top: 1rem;

  @media (min-width: 600px) {
    font-size: 1.2rem;
  }
  @media (min-width: 1200px) {
    font-size: 1.4rem;
  }

  @media (max-width: 767px) {
    font-size: 1.3rem;
    margin-top: -8px;
    margin-left: 0.1rem;
  }
`;


export const ClientTableWrapper = styled.div`
  @media (max-width: 767px) {
    display: none !important;
  }
`;

export const ClientNumberNavWrapper = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: flex !important;
  }
`;

export const ClientSlideMobile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 1.2rem 1.2rem 1.2rem; /* Add top padding here */
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 0;
  scroll-snap-align: start;
  height: 100vh;
  box-sizing: border-box; /* Ensures padding is included in height */

  @media (min-width: 768px) {
    display: none;
  }

  & > * {
    margin-bottom: 0.5rem;
    width: 100%;
    text-align: left;
  }
`;