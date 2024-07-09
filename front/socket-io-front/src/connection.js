import { io } from 'socket.io-client';

const URL = 'http://localhost:4000'
const socketEnv = io(URL);
export default socketEnv

// import socketIO from "socket.io-client";

// const socketEnv = socketIO("http://localhost:4000");

// export default socketEnv;
