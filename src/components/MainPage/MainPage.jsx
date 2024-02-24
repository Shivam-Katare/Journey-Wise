import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button, Input, Option, Select } from '@material-tailwind/react';
import { FaMapLocationDot } from "react-icons/fa6";
import MarkdownPreview from '@uiw/react-markdown-preview';
import TravelGuy from "../../assets/travel_guy.jpg";
import toast from 'react-hot-toast';

let API_KEY = import.meta.env.VITE_GEMINI_AI_Key;

const MainPage = ({ apiKey, myKey, handleMyKeyCount }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [viaTransport, setViaTransport] = useState('');
  const [idealTimeline, setIdealTimeline] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [tripPlan, setTripPlan] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('API Key:', apiKey);

  const transportOptions = [
    "Train",
    "Bus",
    "Car",
    "Flight",
    "Walking",
    "Bicycle",
    "Motorcycle",
    "Taxi",
    "Subway",
    "Boat",
    "Ferry",
    "Cable Car",
    "Rideshare (Uber/Lyft)",
    "Scooter",
    "Tram",
    "Hovercraft",
    "Helicopter",
    "Animal (Horse, Camel, Elephant)",
    "Hot Air Balloon",
    "Watercraft (Jet Ski, Kayak)",
    "Personal Mobility (Pogo Stick, Rollerblades, Segway, Skateboard, Unicycle)"
  ];

  const idealTimelineOptions = [
    "Within a week",
    "Within a month",
    "Within 3 months",
    "Within 6 months",
    "Within a year",
    "Flexible"
  ];

  const numberOfPeopleOptions = [
    "Single person",
    "Couple",
    "Family (3-5)",
    "More than 5"
  ];


  const generateTripPlan = async () => {
    setLoading(true);
    API_KEY = apiKey;
    if (apiKey === '' && myKey > 0) {
      handleMyKeyCount();
      API_KEY = import.meta.env.VITE_GEMINI_AI_Key;
    } else if (apiKey === '' && myKey === 0) {
      toast.error('You have exhausted your API Key limit. Please get a new API Key to continue using the app.');
      setLoading(false);
      return;
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      I'm currently in ${fromCity} and dreaming of a unique trip to ${toCity}!
      While open to various transportation options, a scenic ${viaTransport} journey through
      historical sites would be particularly enchanting. Firstly, in bullet points, tell me
      how can I travel from ${fromCity} to ${toCity} via ${viaTransport}, how much will it cost,
      how many times I need to change the ${viaTransport} if need to only, how much will it cost
      and how many days will it take to arrive via ${viaTransport}, no matter if it is not possible via ${viaTransport}
      then, siggest best transportation and also tell the budget for it. Then, Could you plan an itinerary
      within a reasonable budget, balancing sightseeing with [mention specific interests
      like museums, nature, shopping]. If possible, suggest options that combine travel
      and sightseeing seamlessly. Also, let me know about any relevant visas, travel
      insurance, and currency exchange aspects. Traveling with ${numberOfPeople.toLowerCase()} people,
      we're flexible with dates but aiming for ${idealTimeline}. And, 
      also suggest me the best time to visit ${toCity}. At the end, summerize this trip plan in 2 to 3 lines.
      And also, tell me one fun fact about this trip.
      Thank you for creating a memorable ${toCity} adventure!
    `;
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setTripPlan(text);
      toast.success('Trip plan generated successfully!');
    } catch (error) {
      setTripPlan('Error generating trip plan. API key not valid. Please pass valid API Key to generate trip plan');
      toast.error('Error generating trip plan. API key not valid');
    }

    setLoading(false);
  };

  return (
    <div className="w-full grid justify-items-center mt-[4rem]">
      <div className='w-[72rem] max-w-[72rem] grid grid-cols-5 mb-6'>
        <div className='w-32'>
          <Input label="From" value={fromCity} onChange={(e) => setFromCity(e.target.value)} placeholder="Enter starting city" />
        </div>
        <div className="w-32">
          <Input label="To" value={toCity} onChange={(e) => setToCity(e.target.value)} placeholder="Enter destination city" />
        </div>
        <div className="w-32">
          <Select
            size="lg"
            label="Select Transportation"
            selected={(element) =>
              element &&
              React.cloneElement(element, {
                disabled: true,
                className:
                  "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
              })
            }
            onChange={(value) => setViaTransport(value)}
          >
            {transportOptions.map((option) => (
              <Option key={option} value={option} className="flex items-center gap-2">
                {option}
              </Option>
            ))}
          </Select>
        </div>

        <div className="w-32">
          <Select
            size="lg"
            label="Ideal Timeline"
            selected={(element) =>
              element &&
              React.cloneElement(element, {
                disabled: true,
                className:
                  "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
              })
            }
            onChange={(value) => setIdealTimeline(value)}
          >
            {idealTimelineOptions.map((option) => (
              <Option key={option} value={option} className="flex items-center gap-2">
                {option}
              </Option>
            ))}
          </Select>
        </div>

        <div className="w-32">
          <Select
            size="lg"
            label="Number of People"
            selected={(element) =>
              element &&
              React.cloneElement(element, {
                disabled: true,
                className:
                  "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
              })
            }
            onChange={(value) => setNumberOfPeople(value)}
          >
            {numberOfPeopleOptions.map((option) => (
              <Option key={option} value={option} className="flex items-center gap-2">
                {option}
              </Option>
            ))}
          </Select>
        </div>

      </div>
      <Button
        onClick={generateTripPlan}
        disabled={loading || !fromCity || !toCity || !viaTransport}
        className={`${loading || !fromCity || !toCity || !viaTransport ? 'opacity-50 cursor-not-allowed' : 'bg-black hover:bg-gray-700'} flex items-center gap-3`}
      >
        <FaMapLocationDot fontSize="20px" />

        {loading ? 'Generating...' : 'Generate Trip Plan'}
      </Button>
      <div className="mt-8 relative">
        <h2 className="text-xl font-bold mb-2">{tripPlan && "Your Trip Plan👇"}</h2>
        {
          tripPlan === ""
            ?
            loading ?
              <progress className="progress w-56"></progress>
              :
              <>
                <p className='barriecito text-[22px]'>Your Trip Plan will Show up here</p>
                <img src={TravelGuy} alt='travel-guy' className='w-[18rem] h-auto absolute' />
              </>
            :
            <MarkdownPreview source={tripPlan} className='bg-white text-black mb-5 p-6 border-[2px] border-solid border-black rounded-[10px] max-h-[24rem] overflow-y-scroll' />
        }

      </div>
    </div>
  );

};

export default MainPage;

