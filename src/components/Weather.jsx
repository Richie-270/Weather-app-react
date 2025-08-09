import { useEffect, useState } from "react";
import useWeatherStore from "../store/useWeatherStore";
import { PiCityLight } from "react-icons/pi";
import { IoWaterOutline } from "react-icons/io5";
import { PiWind } from "react-icons/pi";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { FiCloudRain } from "react-icons/fi";

// Weather component: muestra información del clima actual y pronóstico
function Weather() {

  const [data, setData] = useState(null); // Estado para datos del clima actual
  const [loading, setLoading] = useState(false); // Estado de carga
  const [forecast, setForecast] = useState(null); // Estado para pronóstico
  const API_KEY = import.meta.env.VITE_API_KEY;
  const city = useWeatherStore((state) => state.city); // Ciudad seleccionada

  // Efecto para obtener datos cuando cambia la ciudad
  useEffect(() => {
    if (!city) return;

    const getWeather = async () => {
      setLoading(false);
      try {
        // Fetch clima actual
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`
        );
        const result = await res.json();
        setData(result);

        // Fetch pronóstico
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`
        );
        const forecastData = await forecastRes.json();
        setForecast(forecastData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(true);
      }
    };
    getWeather();
  }, [city, API_KEY]);

  // Mostrar mensaje de carga
  if (!loading || !data) {
    return (
      <p className="text-center mt-32 text-sky-800 text-xl">
        Loading weather
      </p>
    );
  }

  // Mostrar error si la ciudad no existe o hay otro problema
  if (data.cod !== 200) {
    return (
      <div className="flex flex-col justify-center items-center mt-32">
        <div className="text-8xl">
          <PiCityLight />
        </div>
        <p className="text-center text-3xl">{data.message}</p>
      </div>
    );
  }

  // Calcular hora local de la ciudad
  const timestampUTC = data.dt;
  const timezoneOffset = data.timezone;
  const localTimes = new Date((timestampUTC + timezoneOffset) * 1000);
  const formattedTime = localTimes.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex justify-center items-start mt-15 select-auto">
      <div className="relative bg-sky-100/5 border-1 border-blue-200/75 rounded-4xl p-4 w-300 h-109 text-center shadow-lg not-sr-only">
        {/* Nombre de la ciudad */}
        <h1 className="text-4xl font-mono text-sky-800/65 absolute top-10 left-15 list-none">
          {data.name}
        </h1>
        {/* Descripción del clima */}
        <p className="text-3xl font-mono text-sky-800/65 absolute top-30 left-15 whitespace-normal">
          {data.weather && data.weather[0] ? data.weather[0].description : "No description"}
        </p>
        {/* Temperatura actual */}
        <p className="text-7xl font-mono text-sky-800/65 absolute top-47 left-65 align-middle">
          {data.main && typeof data.main.temp !== "undefined" ? Math.round(data.main.temp) : "--"}°C
        </p>
        {/* Datos adicionales */}
        <div className="ml-auto mr- mt-auto mb-auto grid grid-cols-2 grid-rows-2 gap-1 h-100 w-150 bg-sky-100/5 border-2 border-blue-200/75 rounded-3xl select-auto">
          {/* Humedad */}
          <div className="relative flex flex-col items-center justify-center text-center not-sr-only">
            <IoWaterOutline className="text-4xl text-sky-800/65 absolute right-20 top-16"/>
            <p className="font-mono text-3xl">{data.main && typeof data.main.humidity !== "undefined" ? data.main.humidity : "--"}%</p>
            <p className="font-mono text-2xl">Humidity</p>
          </div>
          {/* Viento */}
          <div className="relative flex flex-col items-center justify-center text-center">
            <PiWind className="text-4xl text-sky-800/65 absolute right-20 top-16"/>
            <p className="font-mono text-3xl">{data.wind && typeof data.wind.speed !== "undefined" ? Math.round(data.wind.speed * 3.6) : "--"}</p>
            <p className="font-mono text-2xl">Km/h Wind</p>
          </div>
          {/* Sensación térmica */}
          <div className="relative flex flex-col items-center justify-center text-center">
            <PiPersonArmsSpreadLight className="text-4xl text-sky-800/65 absolute right-20 top-16"/>
            <p className="font-mono text-3xl">{data.main && typeof data.main.feels_like !== "undefined" ? Math.round(data.main.feels_like) : "--"}°</p>
            <p className="font-mono text-2xl">Thermal Sensation</p>
          </div>
          {/* Lluvia */}
          <div className="relative flex flex-col items-center justify-center text-center">
            {forecast && Array.isArray(forecast.list) && forecast.list[0] && typeof forecast.list[0].pop !== "undefined" ? (
              <p className="font-mono text-3xl">{Math.round(forecast.list[0].pop * 100)}%</p>
            ) : (
              <p className="font-mono text-3xl">--%</p>
            )}
            <p className="font-mono text-2xl">Rain</p>
            <FiCloudRain className="text-4xl text-sky-800/65 absolute right-17 top-17"/>
          </div>
        </div>
        {/* Icono */}
        {data.weather && data.weather[0] && (
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="icono del clima"
            className="w-60 h-55 position absolute top-31 left-5 not-sr-only"
          />
        )}
        {/* Fecha */}
        <p className="text-2xl font-mono text-sky-800/65 absolute top-90 left-15 select-auto">
          {formattedTime}
        </p>
      </div>
    </div>
  );
}

export default Weather;
