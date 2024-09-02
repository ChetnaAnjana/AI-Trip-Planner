//import { FaUser, FaUserFriends, FaUsers } from 'react-icons/fa';
export const SelectTravelesList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveler in exploration',
    icon: '🛬', // Single user icon <FaUser />
    people: '1'
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travelers in tandem',
    icon: '🥂', // Couple icon <FaUserFriends />
    people: '2 People'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun-loving adventurers/family',
    icon: '🏡', // Group icon <FaUsers />
    people: '3 to 5 People'
  },
   {
    id: 3,
    title: 'Friends',
    desc: 'A bunch of thrill seeker',
    icon: '⛵️', // Group icon <FaUsers />
    people: '5 to 10 People'
  }
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Affordable travel with essential amenities',
    icon: '💸', // Emoji representing economy/budget
   // budgetRange: 'Low'
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Comfortable travel with good amenities',
    icon: '💵', // Emoji representing standard/mid-range
    //budgetRange: 'Moderate'
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Premium travel with luxury amenities',
    icon: '💰', // Emoji representing luxury/high-end
   // budgetRange: 'High'
  }
];
export const AI_PROMPT = 'Generate Travel Plan for Location: {location} for {totalDays} Days for {traveler} with a {budget} budget. Provide at least five hotel options including HotelName, Hotel address, Price, hotel image URI, geo coordinates, rating, descriptions, and suggest an itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time to travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'
