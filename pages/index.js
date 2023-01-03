import Head from 'next/head';
import Image from 'next/image';
// import buildspaceLogo from '../assets/buildspace-logo.png';
// import headerImage from '../assets/creativity.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (event) =>{
    // console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Atara|AI-driven Climate Education</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Climate Education with Atara</h1>
          </div>
          <div className="header-subtitle">
            <h2>Ask a question about the climate crisis, Atara will do the rest!</h2>
          </div>
          {/* Add header image here */}

          {/* <div className="icon-one">
            <Image src={headerImage} alt="header image" className='space-ship' />
          </div> */}
          {/* Add text area*/}
          <div className="prompt-container">
            <textarea 
              placeholder="Ask Atara your question" className="prompt-box" 
              value = {userInput}
              onChange = {onUserChangedText} 
            />
            {/* Add button to generate magic text*/}
            {/* Add loading state here - isGenraating = true if waiting / = false if not */}
            <div className="prompt-buttons">
              <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
                <div className="generate">
                {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
                </div>
              </a>
            </div>
            {/* Add GPT-3 output to our UI here */}
            {apiOutput && (
              <div className="output">
                <div className="output-header-container">
                  <div className="output-header">
                    <h3>Answer</h3>
                  </div>
                </div>
                {/* Display the output here using apiOutput as called above */}
                <div className="output-content">
                  <p>{apiOutput}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://climate-operation.webflow.io/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            {/* <Image src={buildspaceLogo} alt="buildspace logo" /> */}
            <p>Powered by Climate Operation</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
