// bucket.js

// Actions
// 어떤 변동사항을 만들건지 액션타입을 선언한다.
const CREATE = 'bucket/CREATE';
const UPDATE = 'bucket/UPDATE';
const DELETE = "bucket/DELETE";

// 변동사항의 초기값을 선언한다.
const initialState = {
  list: [
    { text: "영화관 가기", completed: false },
    { text: "여행 가기", completed: false },
    { text: "캠핑 가기", completed: false },
    { text: "라떼투어하기", completed: false }
  ],
};

// Action Creators
// 변동사항 카테고리(생성/삭제/로드 등등)별 변동 디테일을 선언한다.
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

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
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
  