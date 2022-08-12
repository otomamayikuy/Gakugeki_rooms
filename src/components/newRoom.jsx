import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, collection, getDocs} from "firebase/firestore";

const NewRoom = (props) => {
    const db = getFirestore(props.app);
    
    const [roomTitle, setRoomTitle] = useState("")
    const [roomMenber, setRoomMenber] = useState(0)
    const [roomStartHour, setRoomStartHour] = useState(-1)
    const [roomStartMinite, setRoomStartMinite] = useState(-1)
    const [roomFinishHour, setRoomFinishHour] = useState(-1)
    const [roomFinishMinite, setRoomFinishMinite] = useState(-1)
    const [room, setRoom] = useState([])
    async function getRoom() {
        const querySnapshot = await getDocs(collection(db, "rooms"));
        const newData=[]
        querySnapshot.forEach((doc) => {
            if(doc.data()) {
                newData.push(doc.data())
            }
        });
        setRoom([...newData])
    }
    
    const roomNumber=room.length
    async function submit() {
        let flag=true
        if(roomTitle !== ""){
            console.log(roomTitle)
        }else{
            flag=false
        }
        if(roomMenber > 0 && Number.isInteger(roomMenber)){
            console.log(roomMenber)
        }else{
            flag=false
        }
        if(0 <= roomStartHour && 24>=roomStartHour && Number.isInteger(roomStartHour) && 0 <= roomStartMinite && 60>=roomStartMinite && Number.isInteger(roomStartMinite)){
            console.log(roomStartHour+":"+roomStartMinite)
        }else{
            flag=false
        }
        if(0 <= roomFinishHour && 24>=roomFinishHour && Number.isInteger(roomFinishHour) && 0 <= roomFinishMinite && 60>=roomFinishMinite && Number.isInteger(roomFinishMinite)){
            console.log(roomFinishHour+":"+roomFinishMinite)
        }else{
            flag=false
        }
        if(flag===true){
            props.function2()
            const DocumentRef = doc(db, "rooms", String(roomNumber+1));
            console.log(DocumentRef)
            await setDoc(DocumentRef,{title:roomTitle, menber:roomMenber, startHour:roomStartHour, startMinite:roomStartMinite, finishHour:roomFinishHour, finishMinite:roomFinishMinite});
            setRoomTitle("");
            setRoomMenber(0);
            setRoomStartHour(-1);
            setRoomStartMinite(-1);
            setRoomFinishHour(-1);
            setRoomFinishMinite(-1);
            getRoom()
        }
    }
    useEffect(()=>{getRoom()},[])
    return (
        <>
        <h1>ルーム一覧・作成ページ</h1>
        <h2>オープンルーム<p>　みんなで好きなことを語ろう！　</p><button type="button" onClick={props.function1}>新規作成</button></h2>
        {props.roomSelect &&
        <div className="roomSelectBack">
            <div className="roomSelect">
                <p>ルームタイトル</p><input value={roomTitle} onChange={(e) => setRoomTitle(e.target.value)}></input><br/>
                <p>ルーム最低人数</p><input value={roomMenber!==0 ? roomMenber : ""} onChange={(e) => ((Number(e.target.value)||e.target.value==="") && setRoomMenber(e.target.value==="" ? 0 : Number(e.target.value)))}></input><br/>
                <p>ルーム開始時刻</p><input value={roomStartHour!==-1 ? roomStartHour : ""} onChange={(e) => ((Number(e.target.value)||e.target.value===""||Number(e.target.value)===0) && setRoomStartHour(e.target.value==="" ? -1 : Number(e.target.value)))}></input><p>時</p>
                <input value={roomStartMinite!==-1 ? roomStartMinite : ""} onChange={(e) => ((Number(e.target.value)||e.target.value===""||Number(e.target.value)===0) && setRoomStartMinite(e.target.value==="" ? -1 : Number(e.target.value)))}></input><p>分</p><br/>
                <p>ルーム終了時刻</p><input value={roomFinishHour!==-1 ? roomFinishHour : ""} onChange={(e) => ((Number(e.target.value)||Number(e.target.value)===""||e.target.value===0) && setRoomFinishHour(e.target.value==="" ? -1 : Number(e.target.value)))}></input><p>時</p>
                <input value={roomFinishMinite!==-1 ? roomFinishMinite : ""} onChange={(e) => ((Number(e.target.value)||e.target.value===""||Number(e.target.value)===0) && setRoomFinishMinite(e.target.value==="" ? -1 : Number(e.target.value)))}></input><p>分</p><br/>
                <button onClick={submit}>決定</button>
            </div>
        </div>}
        <h2>ルーム一覧</h2>
        <table>
            <thead>
                <tr>
                <th>タイトル</th>
                <th>最低人数</th>
                <th>開始時刻</th>
                <th>終了時刻</th>
                <th>参加</th>
                </tr>
            </thead>
            <tbody>
                {room.map((item,index) => (
                    <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.menber}</td>
                        <td>{item.startHour+":"+(item.startMinite===0 ? "00" : item.startMinite)}</td>
                        <td>{item.finishHour+":"+(item.finishMinite===0 ? "00" : item.finishMinite)}</td>
                        <td><button>参加</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}
export default NewRoom