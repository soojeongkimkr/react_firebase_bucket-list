import React from "react";
// BucketList 컴포넌트를 import 해옵니다.
// import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import Progress from "./Progress";
import BucketList from "./BucketList";
import Detail from "./Detail";
import NotFound from "./NotFound";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBucket, loadBucketFB, addBucketFB } from "./redux/modules/bucket";


import {db} from './firebase';
import {collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'


function App() {

  const [list, setList] = React.useState(["영화관 가기", "여행가기", "캠핑 가기"]);
  const text = React.useRef(null);
  const dispatch = useDispatch();

  React.useEffect(()=> {
    // console.log(db);
    
    dispatch(loadBucketFB());

    // // 삭제하기
    // const docRef = doc(db, "bucket", "WFYGDGhGZY5nwWZvhOtj");
    // deleteDoc(docRef)
    
    // // 수정하기
    // const docRef = doc(db, "bucket", "WFYGDGhGZY5nwWZvhOtj");
    // updateDoc(docRef, {completed: true});

    // // 추가하기
    // addDoc(collection(db, "bucket"), {text: "new", completed: false})

    // //가져오기
    // const query = await getDocs(collection(db, "bucket"));
    // console.log(query);
    // query.forEach((doc) => {
    //   console.log(doc.id, doc.data());
    // });
  }, []);

  const addBucketList = () => { 
  // 스프레드 문법! 기억하고 계신가요? :) 
  // 원본 배열 list에 새로운 요소를 추가해주었습니다.
  // setList([...list, text.current.value]);

    // dispatch(createBucket({ text: text.current.value, complete:false}));

    dispatch(addBucketFB({ text: text.current.value, complete:false}))
  }
return (
  <div className="App">
    <Container>
    <Title>내 버킷리스트</Title>
    <Progress/>
    <Line />
    {/* 컴포넌트를 넣어줍니다. */}
    {/* <컴포넌트 명 [props 명]={넘겨줄 것(리스트, 문자열, 숫자, ...)}/> */}
    <Switch>
      <Route path="/" exact>
        <BucketList list={list} />
      </Route>
      <Route path="/detail/:index">
        <Detail />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
    
    </Container>
    {/* 인풋박스와 추가하기 버튼을 넣어줬어요. */}
    <Input>
      <input type="text" ref={text} />
      <button onClick={addBucketList}>추가하기</button>
    </Input>
    <BTN><button onClick={()=>{
      window.scrollTo({top:0, left:0, behavior:"smooth"});
    }}>위로</button></BTN>
  </div>
  );
}

const Input = styled.div`
  max-width: 350px;
  min-height: 5vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  display:flex;
  input{
    width:200px;    
    :focus{
      outline-color: slateblue;
    }
  }
  button{
    margin-left:1em;
    float: right;
    background:slateblue;
    border:1px solid transparent;
    border-radius:5px;
    color:#fff;
    padding:0 20px;
  }
`;

const BTN = styled.div`
  width: 40px;
  height: 40px;
  float: right;
  button{
    width: 40px;
    height: 40px;
    border-radius: 100px;
    border: 1px solid transparent;
    cursor: pointer;
  }
`;

const Container = styled.div`
  max-width: 350px;
  min-height: 50vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;


export default App;