import React, { useEffect, useRef, useState } from "react";
import { Box, useTheme } from "@mui/system";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Avatar, InputAdornment, InputBase } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SendIcon from '@mui/icons-material/Send';


const sendMessageToServer = async function (question) {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/v1/query`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({'question': question})
        }).then(r => {
            if (r.status !== 200) {
                window.alert(r.status)
                return
            }
            return r.json()
        })
        return response
    } catch (e) {
       console.log(e)
    }
}


const Record = function (props) {
    const { msg } = props

    const StyledBox = styled(Box)(({ }) => ({
        p: 1,
        borderRadius: 4,
        display: 'flex',
        flexDirection: msg.from === 1 ? 'row-reverse' : 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }));

    return <StyledBox>
        <Box>
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
    const { messageHistory, scrollRef } = props

    console.log(messageHistory)

    return <Box sx={{ width: '100%', height: '87%', backgroundColor: '#25262b',  overflowWrap: 'break-word', resize: 'none', my: 0.5 }}>
        <Stack spacing={2} style={{maxHeight: "100%", overflow: 'auto'}}>
            {messageHistory.map(msg => (
                <Record msg={msg} />
            ))}
            <Box ref={scrollRef} />
        </Stack>
    </Box>
}

const InputArea = function (props) {
    const { messageHistory, setChats } = props

    const handleInput = (e) => {
        if (e.key === 'Enter') {
            const msg = e.target.value.trim()
            if (msg === '') {
                return
            }
            e.target.value = ''

            setChats(messageHistory => [
                ...messageHistory,
                {
                    from: 1,
                    content: `${msg} :Q`,
                },
            ])

            fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/v1/query`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({'question': msg})
              })
            .then((res) => res.json())
            .then((res) => {
                setChats(messageHistory => [
                    ...messageHistory,
                    {
                        from: 0,
                        content: res.answer.split('\n').map((item, index) => (
                            <React.Fragment key={index}>
                                A: {item}
                                <br />
                            </React.Fragment>
                        )),
                    },
                ])
            })
            .catch((err) => err);
        }
    }

    const handleSendCLick = (e) => {
        const inputEle = document.getElementById('input')
        const msg = inputEle.value.trim()
        if (msg === '') {
            return
        }
        inputEle.value = ''

        setChats(messageHistory => [
            ...messageHistory,
            {
                from: 1,
                content: msg,
            },
        ])

        fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/v1/query`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({'question': msg})
          })
        .then((res) => res.json())
        .then((res) => {
            setChats(messageHistory => [
                ...messageHistory,
                {
                    from: 0,
                    content: res.answer,
                },
            ])
        })
        .catch((err) => err);
    }

    return <div style={{ marginBottom: "10px"}}>
        <Box sx={{
            backgroundColor: "white",
            padding: "0 10px",
            borderRadius: "10px",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '7%',
            m: 1
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
    </div>
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



    return <Box sx={{ backgroundColor: '#25262b', height: '100vh', padding: 1,
        "& > *" : {}
    }}>
        <MessageArea messageHistory={messageHistory} scrollRef={scrollRef} user={user}/>
        <InputArea messageHistory={messageHistory} setChats={setMessageHistory} />
    </Box>
};