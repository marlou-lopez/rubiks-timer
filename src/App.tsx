import './App.css';
import Header from './components/Header/Header';
import Stopwatch from './components/Stopwatch/Stopwatch';
import { AppProvider } from './providers/AppProvider';


function App() {

  return (
    <AppProvider>
      <div className="App">
        <Header />
        <section className="section">
          <Stopwatch />
        </section>
      </div>
    </AppProvider>
  );
}

export default App;
