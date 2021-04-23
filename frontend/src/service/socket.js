import { io } from "../../../backend/index.js";
import React from 'react';

export const socket = io();
export const SocketContext = React.createContext(socket);