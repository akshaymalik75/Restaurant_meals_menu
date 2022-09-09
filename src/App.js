
import './App.css';
import Modal from './components/Modal'
import Search from './components/Search'
import Favorites from './components/Favorites'
import Meals from './components/Meals'

import { useGlobalContext } from './context';



function App() {

const {showModal,favorite:fav} = useGlobalContext();


  // const img= "./coffee.jpg"
  return (
    <main>
      <Search />
     
      {fav.length>0 && <Favorites /> }
      <Meals />
      {showModal  &&  <Modal />}
    </main>
  );
}

export default App;
