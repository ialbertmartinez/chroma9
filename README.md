# Chroma 9 🎨🌦️

> A weather-inspired color palette creator.

**Chroma 9** creates unique color palettes based on real-time weather conditions. Users enter a US zip code, and the application fetches the current weather data to determine a "mood" color (e.g., "Thunderstorm" generates a deep navy, "Clear" generates a bright sky blue). It then uses **The Color API** to generate a full color scheme (Monochrome, Analogic, Complementary, etc.) based on that atmospheric base color.

## 🚀 Features

* **Weather-Driven Palettes:** Maps live weather conditions (Snow, Rain, Mist, Clear, etc.) to curated base colors.
* **Dynamic Scheme Generation:** Supports multiple harmony modes including Monochrome, Analogic, Complementary, Triad, and Quad.
* **Rich Color Data:** Instantly generates HEX, RGB, CMYK, and contrast values for every color in the palette.
* **Responsive UI:** Built with **Bootstrap 5** and custom CSS for a seamless experience on mobile and desktop.
* **Input Validation:** Strict validation ensures only valid 5-digit US zip codes are processed.
* **CI/CD Integration:** Automated deployment pipelines via GitHub Actions.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Styling:** Bootstrap 5.3, Custom CSS
* **Bundler:** Parcel
* **APIs:**
    * [OpenWeatherMap API](https://openweathermap.org/api) (Weather data)
    * [The Color API](https://www.thecolorapi.com/) (Palette generation)
* **Hosting:** Firebase Hosting
* **CI/CD:** GitHub Actions

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone [https://github.com/ialbertmartinez/chroma9.git](https://github.com/ialbertmartinez/chroma9.git)
cd chroma9
```
### 2. Install dependencies

This project uses `parcel` as a build tool and `bootstrap` for styling.
```bash
npm install
```
### 3. Configure API Keys

This project requires an OpenWeatherMap API key to function.

1. Create a file named `config.js` in the root directory (this file is ignored by Git).
    
2. Add your API key to that file:
```js
const WEATHER_API_KEY = "YOUR_OPENWEATHER_API_KEY_HERE";
```
### 4. Run the development server
```bash
npm start
```
The app will open at *`http://localhost:1234`*.

### 5. Build for production

To create the production-ready files in the `dist/` folder:

```bash
npm run build
```
## 📂 Project Structure
chroma9/
├── .github/workflows/ # CI/CD for Firebase Hosting
├── dist/                         # Compiled production code
├── js/
	│   └── main.js        # App logic, API fetching & DOM manipulation
├── css/
	│   └── main.css     # Custom styles & Bootstrap overrides
├── index.html               # Main entry point
├── package.json          # Dependencies (Bootstrap, Parcel) & scripts
├── firebase.json           # Firebase hosting configuration
└── .gitignore                 # Ignored files (config.js, node_modules, .parcel-cache)

## 📄 License

This project is licensed under the **[ISC License](https://opensource.org/license/isc-license-txt) (license info)**

---

© 2025 Albert Martinez

