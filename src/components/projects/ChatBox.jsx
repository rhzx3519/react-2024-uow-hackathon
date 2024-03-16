import React, { useEffect, useRef, useState } from "react";
import { Box, useTheme } from "@mui/system";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Avatar, InputAdornment, InputBase } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SendIcon from '@mui/icons-material/Send';


const Record = function (props) {
    const { msg, user } = props

    const StyledBox = styled(Box)(({ }) => ({
        p: 1,
        borderRadius: 4,
        display: 'flex',
        flexDirection: msg.from?.email === user.email ? 'row-reverse' : 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }));

    return <StyledBox>
        <Box>
            <Typography
                variant='subtitle2'
                color='white'
                sx={{ ml: 2 }}
            >
                {new Date(msg.created_at*1000).toLocaleString()}
            </Typography>
            <Typography
                variant='body1'
                display="inline"
                sx={{ ml: 2 }}
                color='white'
            >
                {msg.content}
            </Typography>
        </Box>
    </StyledBox>
}

const MessageArea = function (props) {
    const { messageHistory, scrollRef, user } = props


    return   <Box sx={{ width: '100%', height: '87%', backgroundColor: '#25262b', my: 0.5 }}>
        <Stack spacing={2} style={{maxHeight: "100%", overflow: 'auto'}}>
            {messageHistory.map(msg => (
                <Record msg={msg} user={user}/>
            ))}
            <Box ref={scrollRef} />
        </Stack>
    </Box>
}

const InputArea = function (props) {
    const { messageHistory, setChats, sendJsonMessage } = props

    const handleInput = (e) => {
        if (e.key === 'Enter') {
            const msg = e.target.value.trim()
            if (msg === '') {
                return
            }
            e.target.value = ''

            sendJsonMessage(msg)
        }
    }

    const handleSendCLick = (e) => {
        const inputEle = document.getElementById('input')
        const msg = inputEle.value.trim()
        if (msg === '') {
            return
        }
        inputEle.value = ''

        sendJsonMessage(msg)
    }

    return <Box sx={{
        backgroundColor: "white",
        padding: "0 10px",
        borderRadius: "10px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '5.5%',
        m: 1,
    }}>
            <AddCircleOutlineIcon style={{ cursor: 'pointer' }} fontSize='medium' sx={{
                color: 'black',
                mr: 1,
            }} onClick={(e) => {console.log('click add...')}} />
            <InputBase id='input' placeholder="Just chat..." sx={{
                flexGrow: 1,
                width: "100%",
            }} onKeyDown={handleInput} />
            <SendIcon style={{ cursor: 'pointer' }} fontSize='medium' onClick={handleSendCLick} />
        </Box>
}



export default function ChatBox(props) {
    const { user } = props
    const [messageHistory, setMessageHistory] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        }
    }, [messageHistory]);


    const WS_URL = `wss://${window.location.hostname}${process.env.REACT_APP_CHAT_WEBSOCKET_PATH}/v1/ws/chat`


    return <Box sx={{ backgroundColor: '#25262b', height: '100vh', padding: 1,
        "& > *" : {}
    }}>
        <MessageArea messageHistory={messageHistory} scrollRef={scrollRef} user={user}/>
        <InputArea messageHistory={messageHistory} setChats={setMessageHistory} />
    </Box>
};