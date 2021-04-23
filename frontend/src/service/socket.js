import io from "socket.io-client";
import React from 'react';

const PORT = process.env.PORT || 4000;
console.log(("ws://" + window.location.href + ":" + PORT));
export const socket = io.connect(("ws://" + window.location.href + ":" + PORT), { transports : ['websocket'] });
export const SocketContext = React.createContext(socket);