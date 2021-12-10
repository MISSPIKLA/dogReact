import { useState } from 'react'
import { Storage, Predictions } from 'aws-amplify';

function App() {
  const [file, setFile] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [isDog, setIsDog] = useState(false)

  return (
    <div className="App">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={async () => {
        const storageResult = await Storage.put('puppy.png', file, {
          level: 'public',
          type: 'image/png'
        })

        const predictionsResult = await Predictions.identify({
          labels: {
            source: {
              key: storageResult.key
            }
          }
        })
        
        if (predictionsResult.labels.find(x => x.name === 'Dog')) {
          setIsDog(true)
        } else {
          setIsDog(false)
        }
        
        setUploaded(true)
        console.log(storageResult);
      }}>Upload and check if there's a dog!</button>

      <div>
        {uploaded
          ? <div>Your image is uploaded!</div>
          : <div>Upload a photo to get started</div>}
        {isDog
          ? <div> This image contains a dog ?</div>
          : <div> This image doesn't have a dog ? </div>}
      </div>
    </div>
    );
}

export default App;