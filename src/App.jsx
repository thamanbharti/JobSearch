import {useState} from "react";
import logo from "./assets/chatbot.jpg";
import {Modal, Typography, Box, TextField} from '@mui/material';
import axios from "axios";
function App() {
  const [open, setOpen]=useState(false);   //Default value of modal is set to false
  const [prompt, setPrompt]=useState("");
  const [response, setResponse]=useState("");
  const [loading, setLoading]=useState(false);

  const handleOpen= ()=>{
    setOpen(true);
  }
  const handleClose=()=>{
    setOpen(false);
  }

  //We will connect to backend using handleSubmit Function
  const handleSubmit= async(e)=>{       
      e.preventDefault();
      setLoading(true);
      const res=await axios.post("http://localhost:3000/chat", {prompt})
      setResponse(res);
      setLoading(false);
      console.log(res);
  }
  return (
    <div className="app">
      <img src={logo}/>
      <button onClick={handleOpen} className="btn">Ask Me Anything </button>
     
<Modal
  open={open}       //open==true ->Modal will be visible,   open==false-> Modal will not be visible
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  className="chatgpt-modal"
>
  <Box className="container">
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Drop your Questions
    </Typography>
   <form style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
   <TextField value={prompt} onChange={(e)=>setPrompt(e.target.value)} id="outlined-basic" label="Query" variant="outlined" sx={{margin:"15px  0px", width:"100%"}} onSubmit={(e)=>{handleSubmit(e)}}/>
   <button type="submit" className="btn">Submit</button>
   </form>
  </Box>
</Modal>
    </div>
  )
}

export default App
