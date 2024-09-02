import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Hotels from "../components/Hotels";
import InfoSection from "../components/InfoSection";
import PlacesToVisit from "../components/PlacesToVisit";
function Viewtrip() {
    const{tripId} =useParams();
    const[trip, setTrip] = useState([]);

    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])

    // used to get trip information from Firebase
    const GetTripData=async()=>{
        const docRef=doc(db, 'AITrips',tripId); // tripId is basically docId
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Dodcument:", docSnap.data());
            setTrip(docSnap.data());
        }else{
            console.log("No Such Document");
            toast( 'No trip Found!')
        }
    }


  return (
    <div className = 'p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* Information Section  */}

        <InfoSection trip = {trip}/>
        {/* Recommended Hotels */}

        <Hotels trip = {trip}/>
        {/* Daily Plans */}
        <PlacesToVisit trip ={trip}/>
        
        {/* Footer */}
        <Footer trip = {trip}/>
    </div>
  )
}

export default Viewtrip