import createTheme from '.';

export default createTheme({
  colorScheme: 'light', // Change to 'light' for pink and blue
  primaryColor: 'pink', // Change to 'pink' for primary color

  other: {
    AppShell_backgroundColor: '#F0E5FF', // Light background color
    hover: '#85C1E9', // Light hover color
  },
  
  colors: {
    light: [
      '#FFFFFF',
      '#CED0D4',
      '#E8E8EB',
      '#D1D1D6',
      '#BABAC2',
      '#A2A3AD',
      '#85C1E9',
      '#44475A',
      '#F0E5FF',
      '#44475A',
    ],
    pink: [
      '#FFFFFF',
      '#F7F2FF',
      '#EFE4FE',
      '#EBDEFE',
      '#E7D7FD',
      '#DEC9FC',
      '#D6BCFC',
      '#CEAEFB',
      '#C6A1FA',
      '#BD93F9',
    ],
  },
});
