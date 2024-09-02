import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { useEffect } from "react";
import { CiShare2 } from "react-icons/ci";

function InfoSection({ trip }) {


    useEffect(() => {
        trip&&GetPlacePhoto();
    }, [trip]);

    const GetPlacePhoto = async() => {
            const data = {
                  textQuery: trip?.userSelection?.location?.label
            };
            const result = await GetPlaceDetails(data).then(resp=>{
                console.log(result.data);
            })
    };
    
  return (
    <div>
      <img
        src="/placeholder.jpg"
        className="h-[340px] w-full object-cover rounded-xl"/>
        <div className = 'flex justify-between items-center'>
        <div className= 'my-5 flex flex-col gap-2 '>
            <h2 className ="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
            <div className =" flex gap-5">
                <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xl md:text-md"> 📅 {trip?.userSelection?.noOfDays} Day</h2>
                <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xl md:text-md"> 💰 {trip?.userSelection?.budget} Budget</h2>
                <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xl md:text-md">  🥂 No. of Traveler: {trip?.userSelection?.Traveler} People</h2>
            </div>
        </div>
        <Button> <CiShare2 /></Button>
        </div>
    </div>
  );
}

export default InfoSection;