import { useEffect, useState } from 'react';
import MainPage from './components/MainPage/MainPage';
import NavBar from './components/NavBar/NavBar';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [myKey, setMyKey] = useState(15);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('apiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSaveKey = () => {
    localStorage.setItem('apiKey', apiKey);
    toast.success('API Key Updated!');
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
    if(event.target.value === ''){
      localStorage.removeItem('apiKey');
      setApiKey('');
      toast.success('API Key Cleared!');
    }
  };

  const handleMyKeyCount = () => {
    setMyKey(prevKey => {
      const newKey = prevKey - 1;
      localStorage.setItem('myKey', newKey);
      return newKey;
    });
  }

  useEffect(() => {
    const savedMyKey = localStorage.getItem('myKey');
    if (savedMyKey) {
      setMyKey(Number(savedMyKey));
    }
  }, []);

  return (    
    <div className="App min-w-min" data-theme="fantasy">
      <NavBar apiKey={apiKey} handleSaveKey={handleSaveKey} handleApiKeyChange={handleApiKeyChange} myKey={myKey}/>
      <MainPage apiKey={apiKey} myKey={myKey} handleMyKeyCount={handleMyKeyCount}/>
      <Toaster />
    </div>
  );
}

export default App;
