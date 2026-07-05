// Singleton module to hold the live socket reference outside of Redux.
// Redux proxies/serializes objects, destroying Socket.IO instances.
let socket = null;

export const getSocket = () => socket;
export const setSocketRef = (s) => { socket = s; };
