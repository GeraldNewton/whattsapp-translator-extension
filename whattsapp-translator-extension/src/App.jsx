import { useEffect, useState,useRef } from 'react'
import './App.css'

function App() {
  const [lang, setLang] = useState({
    sender:"english",
    receiver:"english"
  })
  const [sendChange, setSendChange] = useState(false)
  const [recvChange, setRecvChange] = useState(false)

  const Tab=useRef()
  const [whattsapp,setWhattsapp]=useState(false);


  useEffect(()=>{
    findCurrentTab();
  },[])


  useEffect(()=>{
    const call=()=>{
      chrome.storage.sync.set({ sender: lang.sender, receiver: lang.receiver });
    }
    if (Tab.current) 
    call();

  },[lang])

 
  const loadInitialLang=()=>{
    chrome.storage.sync.get(['sender', 'receiver'], (result) => {
      setLang({sender:result.sender??"english",receiver:result.receiver??"english"})
    });

  }
  async function findCurrentTab() {
    try {
      let queryOptions = { active: true, lastFocusedWindow: true };
      let [tab] = await chrome.tabs.query(queryOptions);
      if(tab && tab.url.includes("https://web.whatsapp.com")){
        setWhattsapp(true);
        Tab.current=tab;
        loadInitialLang()
      }
      else
      setWhattsapp(false);
    } catch (error) {
      console.error("Error retrieving current tab:", error);
    }
  }
  

  return (
    (whattsapp?(
      <div className="container">
        <div>
          <h3>Sender's Language</h3>
          {sendChange ?(
          <select id="select" onChange={(e)=>{setLang((prev)=>({...prev,sender:e.target.value}));setSendChange(false)}}>
            <option disabled selected>select lang</option>
            <option value="english">english</option>
            <option value="hindi">hindi</option>
            <option value="chinese">chinese</option>
            <option value="japanese">japanese</option>
            <option value="russian">russian</option>
          </select>
          ):(
            <>
              <h4>{lang.sender}</h4>
              <button onClick={()=>setSendChange(true)}>change</button>
            </>
          )}
        </div>
        <div>
          <h3>Receiver's Language</h3>
          {recvChange?(
          <select id="select"  onChange={(e)=>{setLang((prev)=>({...prev,receiver:e.target.value}));setRecvChange(false)}}>
            <option disabled selected>select lang</option>
            <option value="english">english</option>
            <option value="hindi">hindi</option>
            <option value="chinese">chinese</option>
            <option value="japanese">japanese</option>
            <option value="russian">russian</option>
          </select>
          ):(
            <>
              <h4>{lang.receiver}</h4>
              <button onClick={()=>setRecvChange(true)}>change</button>
            </>
          )}
        </div>
      </div>
      
    ):(
      <div className="container">
        Not present on whattsapp
      </div>
    ))
  )
}

export default App
