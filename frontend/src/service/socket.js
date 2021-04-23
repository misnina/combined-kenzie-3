import io from "socket.io-client";
import React from 'react';

console.log(process.env.PORT);

export const socket = io.connect(("ws://" + window.location.href + ":" + process.env.PORT), { transports : ['websocket'] });
export const SocketContext = React.createContext(socket);