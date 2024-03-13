import './App.css';
import { Main } from './Components/Main';
import { DataContextProvider } from './Components/DataContext';

function App() {
  return (
    <DataContextProvider>
      <Main />
    </DataContextProvider>

  );
}

export default App;
