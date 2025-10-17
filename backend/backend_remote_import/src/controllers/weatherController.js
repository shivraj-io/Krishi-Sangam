import axios from "axios";

export const getWeather = async (req, res) => {
  try {
    const { village, district, state } = req.query;
    if (!village || !district || !state) 
      return res.status(400).json({ message: "village, district, state required" });

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const location = `${village},${district},${state},IN`;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    );

    const data = response.data;
    const weather = {
      location: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
    };

    res.json({ weather });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
