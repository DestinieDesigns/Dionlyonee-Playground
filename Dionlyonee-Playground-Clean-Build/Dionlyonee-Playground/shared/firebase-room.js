import{database}from "./firebase-config.js";import{ref,set,get,update,onValue,remove}from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";
const ROOT="rooms",clean=x=>String(x||"").trim().toUpperCase();
function generateRoomCode(){const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let x="DION";for(let i=0;i<4;i++)x+=c[Math.floor(Math.random()*c.length)];return x}
async function createRoom(game){let code=generateRoomCode();while((await get(ref(database,`${ROOT}/${code}`))).exists())code=generateRoomCode();await set(ref(database,`${ROOT}/${code}`),{roomInfo:{roomCode:code,game,createdAt:Date.now(),status:"waiting"},connections:{host:false,cohost:false,live:false},gameState:{phase:"waiting"},players:{},usedContent:{}});return code}
async function roomExists(c){return !!clean(c)&&(await get(ref(database,`${ROOT}/${clean(c)}`))).exists()}
async function getRoom(c){const s=await get(ref(database,`${ROOT}/${clean(c)}`));return s.exists()?s.val():null}
const updateRoom=(c,u)=>update(ref(database,`${ROOT}/${clean(c)}`),u);
const updateGameState=(c,u)=>update(ref(database,`${ROOT}/${clean(c)}/gameState`),u);
const updatePlayers=(c,p)=>set(ref(database,`${ROOT}/${clean(c)}/players`),p);
const setConnection=(c,r,v)=>update(ref(database,`${ROOT}/${clean(c)}/connections`),{[r]:v});
const listenToRoom=(c,cb)=>onValue(ref(database,`${ROOT}/${clean(c)}`),s=>cb(s.exists()?s.val():null));
const markContentUsed=(c,t,id)=>set(ref(database,`${ROOT}/${clean(c)}/usedContent/${t}/${id}`),true);
async function getUsedContent(c,t){const s=await get(ref(database,`${ROOT}/${clean(c)}/usedContent/${t}`));return s.exists()?s.val():{}}
const deleteRoom=c=>remove(ref(database,`${ROOT}/${clean(c)}`));
export{generateRoomCode,createRoom,roomExists,getRoom,updateRoom,updateGameState,updatePlayers,setConnection,listenToRoom,markContentUsed,getUsedContent,deleteRoom};