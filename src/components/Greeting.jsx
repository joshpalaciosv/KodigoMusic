import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Greeting() {

        const [greeting, setGreeting] = useState('');
      
        useEffect(() => {
          const fetchTime = async () => {
            try {
              const apiKey = import.meta.env.VITE_TIMEZONEDB_API_KEY;
              //utilizamos la API de TimezoneDB para obtener la hora actual en El Salvador
              const response = await axios.get(`https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=America/El_Salvador`);
              const currentTime = new Date(response.data.timestamp * 1000);
              const hours = currentTime.getUTCHours();
              //console.log('hours:', hours);
      
            // en base a la hora actual, definimos el saludo.
              if (hours < 12) {
                setGreeting('Buenos Dias');
              } else if (hours < 18) {
                setGreeting('Buenas Tardes');
              } else {
                setGreeting('Buenas Noches');
              }
            } catch (error) {
              console.error('Error obteniendo el tiempo:', error);
            }
          };
      
          fetchTime();
        }, []);

  return (
    <h1>{greeting}</h1>
  )
}
