import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { deleteBucket, deleteBucketFB, updateBucketFB } from "./redux/modules/bucket";
import { updateBucket } from "./redux/modules/bucket";
import { useHistory } from "react-router-dom"

const Detail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const bucket_index = params.index;
  const bucket_list = useSelector((state) => state.bucket.list);
  // console.log(params.index)
  // console.log(bucket_list)
    return (
      <>
      <Title>{bucket_list[bucket_index]? bucket_list[bucket_index].text : ""}</Title>
      <button onClick={()=>{
        // dispatch(updateBucket(bucket_index));
        dispatch(updateBucketFB(bucket_list[bucket_index].id));
      }}>완료하기</button>
      <button onClick={()=>{
        // dispatch(deleteBucket(bucket_index));
        dispatch(deleteBucketFB(bucket_list[bucket_index].id));
        history.goBack();
      }}>삭제하기</button>
      
      </>
    )

}

export default Detail;

const Title = styled.h2`
  color:#ccc;
`;