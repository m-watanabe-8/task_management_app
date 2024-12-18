import { createTheme } from '@mui/material/styles';
import { RouterProvider } from "react-router-dom";
import router from "./configs/Router";

function App() {
  const theme = createTheme()

  return (
      <RouterProvider router={router} />
  );
}

export default App;
