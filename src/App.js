import './App.css';
import { HashRouter } from 'react-router-dom';

// Components:
import SideBar from './components/SideBar/SideBar';
import PrincipalContainer from './components/PrincipalContainer/PrincipalContainer';

// Hooks:
import {useModal} from './hooks/useModal';

function App() {
  const [ isOpenAside, openAside, closeAside ] = useModal(false);
  return (
    <div id="App" className="App">
      <HashRouter>
        <SideBar
          isOpen={isOpenAside}
          open={openAside}
          close={closeAside}
        />

        <PrincipalContainer
          isOpenAside={isOpenAside}
          openAside={openAside}
          closeAside={closeAside}
        />
      </HashRouter>
    </div>
  );
}

export default App;
