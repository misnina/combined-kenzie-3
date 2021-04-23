import io from "socket.io-client";
import React from 'react';

export const socket = io.connect(process.env.public_url, { transports : ['websocket'] });
export const SocketContext = React.createContext(socket);