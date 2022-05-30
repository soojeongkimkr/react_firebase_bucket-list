import React from 'react';
import styled from "styled-components";
import { useSelector } from 'react-redux';

const Progress = (props)=>{
  const bucket_list = useSelector((state)=> state.bucket.list);
    console.log(bucket_list)
    
    let count = 0;
    bucket_list.map((b,idx)=>{
      if(b.completed){
        count ++;
      }
    })
  return(
    <ProgressBar>
      <HighLight width={(count/bucket_list.length) * 100 + "%"}/>
      <Dot/>
    </ProgressBar>
  )
}

const ProgressBar = styled.div`
  background: #eee;
  width: 100%;
  height: 20px;
  display:flex;
  align-items:center;
  border-radius:10px;
`;
const Dot = styled.div`
  background:#fff;
  border: 5px solid slateblue;
  width:30px;
  height: 30px;
  border-radius:50px;
  margin: 0 0 0 -12px;
`;
const HighLight = styled.div`
  background: slateblue;
  transition: 1s;
  width: ${(props)=> props.width};
  height: 20px;
  border-radius:10px;
`;
export default Progress;