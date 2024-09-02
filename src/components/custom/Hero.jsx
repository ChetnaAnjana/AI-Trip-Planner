import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
function Hero() {
  return (
    <div className="flex flex-col item-center mx-56 gap-9">
      <h1 className="text-5xl font-extrabold text-gray-900 text-center mt-8">
        <span className="text-[#ff5733] mb-4 block">Discover Your Next Adventure Using AI:</span>
        Personalized Itineraries At Your Fingertip
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
    <div className="flex justify-center">
        {/* when we click on this button it will take us to create-trip page where we will ask bunch of questions. */}
        {/* // to do this I have used the Link tag. and also put the path and element of the create-trip page in createbrowser route present in main.jsx */}
        <Link to={'/create-trip'}>
        <Button className="w-auto max-w-xs">Get Started. It's Free</Button>
        </Link>
    </div>
    </div>
  );
}

export default Hero;
