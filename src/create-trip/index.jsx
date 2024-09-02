import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import { db } from "@/service/firebaseConfig";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios"; // Added axios import
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    noOfDays: "",
    location: null,
    budget: null,
    Traveler: null,
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log(codeResp);
      GetUserProfile(codeResp);
    },
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (formData?.noOfDays > 10 || !formData?.location || !formData?.budget || !formData?.Traveler) {
      toast("Please fill all details.");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", formData?.location?.label)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.Traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    //console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--",result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text()) // inside this SaveTrip we will add AI Response as a parameter which will be used as TripData
  };

const SaveAiTrip = async (TripData) => {
  setLoading(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const docId = Date.now().toString();

  await setDoc(doc(db, "AITrips", docId), {
    userSelection: formData,
    tripData: JSON.parse(TripData),
    userEmail: user?.email,
    id: docId
  });
  setLoading(false);
  navigate('/view-trip/' +docId)
};



  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
        localStorage.setItem('user' ,JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h1 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h1>
      <p className="mt-3 text-xl text-gray-500">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>
      <div className="mt-10 flex flex-col gap-10">
        <div>
          <h2 className="font-bold text-xl my-3 font-medium">What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="font-bold text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <Input
            type="number"
            placeholder={"number of days EX. 3"}
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
        <div>
          <h2 className="font-bold text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.budget === item.title ? "shadow-lg border-black" : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-bold text-xl my-3 font-medium">Who do you want to travel with in your next trip?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("Traveler", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.Traveler === item.people ? "shadow-lg border-black" : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 flex justify-end">
        <Button
        disabled={loading}
        onClick={OnGenerateTrip}>
          {loading?
          <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />: 'Generate Trip'
          }
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
              onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
