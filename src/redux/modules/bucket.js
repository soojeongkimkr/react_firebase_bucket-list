// bucket.js
import {db} from '../../firebase';
import {collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'



// Actions
// 어떤 변동사항을 만들건지 액션타입을 선언한다.
const LOAD = 'bucket/LOAD';
const CREATE = 'bucket/CREATE';
const UPDATE = 'bucket/UPDATE';
const DELETE = "bucket/DELETE";

// 변동사항의 초기값을 선언한다.
const initialState = {
  list: [
    // { text: "영화관 가기", completed: false },
    // { text: "여행 가기", completed: false },
    // { text: "캠핑 가기", completed: false },
    // { text: "라떼투어하기", completed: false }
  ],
};

// Action Creators
// 변동사항 카테고리(생성/삭제/로드 등등)별 변동 디테일을 선언한다.

// loadBucket은 firestore에서 넘어온 데이터를 그대로 넣어주는 역할
export function loadBucket(bucket_list){
  return {type: LOAD, bucket_list}
}

export function createBucket(bucket){
  return {type: CREATE, bucket: bucket};
}

export function updateBucket(bucket_index){
  
  return {type:UPDATE, bucket_index};
}

// 지울 것이기 때문에 지울것의 인덱스를 쓰는 것이 좋다.
export function deleteBucket(bucket_index){
  // console.log("지울 버킷 인덱스", bucket_index);
  return {type: DELETE, bucket_index};
}


// middleware
export const loadBucketFB = () => {
  return async function (dispatch) {
    const bucket_data = await getDocs(collection(db, "bucket"));
    // console.log(bucket_data);

    let bucket_list = [];

    bucket_data.forEach((doc) => {
      // console.log(doc.data());

      // 방법 1
      // bucket_list = [...bucket_list, {...doc.data()}]
      // 방법 2
      bucket_list.push({id:doc.id,...doc.data()});
    });
    // console.log(bucket_list)

    dispatch(loadBucket(bucket_list));
  };
};

export const addBucketFB = (bucket) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, 'bucket'), bucket);
    // 방법1
    // const _bucket = await getDoc(docRef);
    // const bucket_data = {id: _bucket.id, ..._bucket.data()}

    // 방법2
    const bucket_data = {id: docRef.id, ...bucket}

    // console.log((await getDoc(docRef)).data());
    console.log(bucket_data)

    dispatch(createBucket(bucket_data));
  }
}

// 버킷리스트에서는 목록내용을 수정하는 것이 아니라
// 목록 id를 받아와서 색상만 변경해주면 되기 때문에
// 파라미터로 id만 가져온다.
export const updateBucketFB = (bucket_id) => {
  return async function (dispatch, getState){
    // console.log(bucket_id);
    const docRef = doc(db, "bucket", bucket_id)
    await updateDoc(docRef, {completed: true})

    // 리덕스에 있는 데이터도 바꿔주기
    // 아래는 모든 목록을 보여주는 콘솔
    // console.log(getState().bucket);
    const _bucket_list = getState().bucket.list;
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id;
    })

    dispatch(updateBucket(bucket_index));
    // console.log(bucket_index)
  }
}

export const deleteBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    if (!bucket_id) {
      window.alert("아이디가 없네요!");
      return;
    }
    const docRef = doc(db, "bucket", bucket_id);
    await deleteDoc(docRef);

    // 리덕스에 있는 데이터도 바꿔주기
    // 아래는 모든 목록을 보여주는 콘솔
    // console.log(getState().bucket);
    const _bucket_list = getState().bucket.list;
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id;
    })
    dispatch(deleteBucket(bucket_index));
  }
}


// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/LOAD": {
      return {list: action.bucket_list};
    }
    case "bucket/CREATE": {
      const new_bucket_list = [...state.list, action.bucket];
      return {list : new_bucket_list};
    }
    case "bucket/UPDATE": {
      const new_bucket_list = state.list.map((l, idx)=>{
        console.log(l);
        if(parseInt(action.bucket_index) === idx){
          return {...l, completed: true}
        } else {
          return l;
        }
      })
      // console.log({list: new_bucket_list})
      return {list: new_bucket_list};
    }
    case "bucket/DELETE": {
      const new_bucket_list = state.list.filter((l, idx)=> {
        return parseInt(action.bucket_index) !== idx;
      })
      // console.log(state, action)

      // return new_bucket_list 라고만 한다면 initialState 형식과는 다르게 key 값이 없기 때문에
      // 아래와 같이 적어줘야한다.
      return {list: new_bucket_list};
    }
    default:
      return state;
    }
  }
  