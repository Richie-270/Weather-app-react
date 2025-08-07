import { useState } from "react";
import useWeatherStore from "../store/useWeatherStore";
import { CiSearch } from "react-icons/ci";

function InputWeather() {
  const [input, setInput] = useState("");
  const setCity = useWeatherStore((state) => state.setCity);

  const handleInputChange = (e) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    if (trimmedInput !== "") {
      setCity(trimmedInput);
      console.log("name of the city;", trimmedInput);
    } else {
      alert("please enter a valid city name");
    }
  };

  return (
    <div className="flex justify-center items-start mt-3 ">
      <form action="" onSubmit={handleInputChange}>
        <input
          className=" bg-sky-100/10 border-1 border-sky-700/55 rounded-4xl border-1xl p-2 w-150 text-center text-lg hover:bg-grey-100 transform duration-300 ease-in-out hover:scale-102"
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Enter city name"
          value={input}
        />
        <button
          className="bg-sky-400/80 text-white rounded-3xl p-4 ml-4 hover:bg-sky-500/60 transform duration-300 ease-in-out hover:scale-102"
          type="submit"
        >
          <CiSearch />
        </button>
      </form>
    </div>
  );
}

export default InputWeather;
