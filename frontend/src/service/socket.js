import io from "socket.io-client";
import React from 'react';

const url = process.env.public_url.toString();
const port = process.env.PORT.toString();
console.log(typeof process.env.public_url);

export const socket = io.connect(`${url}:${port}`, { transports : ['websocket'] });
export const SocketContext = React.createContext(socket);