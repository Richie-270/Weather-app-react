import { create } from 'zustand';

const useWeatherStore = create((set) => ({
    city: '',
    setCity: (newCity) => set({city: newCity}),
}));

export default useWeatherStore;