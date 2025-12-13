import { useEffect, useState } from 'react';
import './App.css';
import useGoogleSheets from 'use-google-sheets';
import { Bird, RawBird } from './util/Types';
import { rawBirdToBird } from './util/TypeConvert';
import BirdList from './components/BirdList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';

function App() {
  const [birdlist, setBirdList] = useState<Bird[]>([]); 
  const { data, loading, error } = useGoogleSheets({
    apiKey: process.env.REACT_APP_API_KEY!,
    sheetId: process.env.REACT_APP_SHEET_ID!,
  });

  useEffect(() => {
    if(data["0"] && data["0"]["data"]){
      var bl : RawBird[] = data["0"]["data"] as RawBird[]
      bl.shift()
      setBirdList(bl.map(rawBirdToBird))
    }
  }, [data])

  if (loading) {
    return(
      <div>
        <Spinner>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div>Error fetching data!</div>;
  }

  return (
    <div className="App">
      <BirdList birds={birdlist}/>
    </div>
  );
}

export default App;
