import io from "socket.io-client";
import React from 'react';

export const socket = io.connect(`wss://${window.location.host}/`, { transports : ['websocket'] });
export const SocketContext = React.createContext(socket);