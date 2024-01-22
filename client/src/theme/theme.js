export const colors = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#C8E4A6",
    100: "#A3D989",
    200: "#77CE6D",
    300: "#52C260",
    400: "#37B563",
    500: "#1DA86C",
    600: "#1C9047",
    700: "#1A782B",
    800: "#196218",
    900: "#214C14",
    1000: "#203710",
  },
};

export function themeSettings(mode) {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
        //
        // Colors for darkmode
        //
            primary: {
              dark: colors.primary[200],
              main: colors.primary[500],
              light: colors.primary[800]
            },
            neutral: {
              dark: colors.grey[100],
              main: colors.grey[200],
              mediumMain: colors.grey[300],
              medium: colors.grey[400],
              light: colors.grey[700]
            },
            background: {
              default: colors.grey[900],
              alt: colors.grey[800]
            }
          }
        : {
        //
        // Colors for lightmode
        //
            primary: {
              dark: colors.primary[700],
              main: colors.primary[500],
              light: colors.primary[50]
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              mediumMain: colors.grey[400],
              medium: colors.grey[300],
              light: colors.grey[50]
            },
            background: {
              default: colors.grey[10],
              alt: colors.grey[0]
            }
          })
    },
    typography: {
      fontFamily: ["Rubik", "Montserrat", "Roboto", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Montserrat", "Rubik", "Roboto", "sans-serif"].join(","),
        fontSize: 40
      },
      h2: {
        fontFamily: ["Rubik", "Montserrat", "Roboto", "sans-serif"].join(","),
        fontSize: 32
      },
      h3: {
        fontFamily: ["Rubik", "Montserrat", "Roboto", "sans-serif"].join(","),
        fontSize: 24
      },
      h4: {
        fontFamily: ["Rubik", "Montserrat", "Roboto", "sans-serif"].join(","),
        fontSize: 20
      },
      h5: {
        fontFamily: ["Rubik", "Montserrat", "Roboto", "sans-serif"].join(","),
        fontSize: 18
      },
      h6: {
        fontFamily: ["Rubik", "Montserrat", "Roboto", "sans-serif"].join(","),
        fontSize: 16
      }
    },
  };
};