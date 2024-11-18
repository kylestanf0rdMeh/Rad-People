import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { fetchEvents } from '../middleware/Events';
import { EventItem } from '../models/Event.model';
import defaultVideo from '../assets/radpeople-landingPage.mp4';




const EventDescription: React.FC = () => {



  useEffect(() => {
    const getEvents = async () => {
      try {
        return
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    getEvents();
  }, []);


  return (
    <div>Hi</div>
  );
};

export default EventDescription;