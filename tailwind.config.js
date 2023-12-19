/** @type {import('tailwindcss').Config} */
module.exports                  = {
  content                       : [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme                         : {
    extend                      : {
        colors                  : {
            "pokedex"           : {
                "base-green"    : "#a4ba17",
                "base-black"    : "#0F0E0D",
                "base-white"    : "#F0F0F0",
            },
            "background"        : "#5E69AB"
        },
        fontFamily              : {
            "gameboy"           : ["gameboy", "sans-serif"]
        }
    }
  },
  plugins: [],
}

