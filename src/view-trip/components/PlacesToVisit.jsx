import PlaceCardItem from "./PlaceCardItem"

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg'>Places to Visit </h2>
        <div>
            {trip.tripData?.itinerary.map((itinerary, index) =>(
                <div className="mt-5">
                <h2 className='font-medium text-lg'> Day {itinerary?.day}</h2>
                  <div className="grid grid-cols-2 gap-5">
                    {itinerary.places.map((place, index)=>(
                        <div className="">
                            <h2 className="font-medium text-sm text-orange-600">{place?.bestTime}</h2>
                            <PlaceCardItem place = {place}/>
                        </div>
                    ))}
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit