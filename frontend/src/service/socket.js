import io from "socket.io-client";
import React from 'react';

export const socket = io.connect(`${process.env.public_url}:${process.env.PORT}`, { transports : ['websocket'] });
export const SocketContext = React.createContext(socket);