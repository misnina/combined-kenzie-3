import io from "socket.io-client";
import React from 'react';

const url = ("ws://" + window.location.host);
export const socket = io.connect(url, { transports : ['websocket'] });
export const SocketContext = React.createContext(socket);