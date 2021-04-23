import io from "socket.io-client";
import React from 'react';

const PORT = process.env.PORT || 4000;
const url = ("ws://" + window.location.host);
export const socket = io.connect(url);
export const SocketContext = React.createContext(socket);