import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNAGzij8EA1nQlvOnJOQE3bBOYIo0HVx8",
  authDomain: "blog-e6f6c.firebaseapp.com",
  projectId: "blog-e6f6c",
  storageBucket: "blog-e6f6c.appspot.com",
  messagingSenderId: "624731671173",
  appId: "1:624731671173:web:234c90db4ec95f899977ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app)

function GetPostData() {
    const user_ref=ref(db, 'post/')
    get(user_ref).then((snapshot)=>{
      const data=snapshot.val()
      
       let html= "";
       const table=document.querySelector('.main')
       for(const key in data){
        const{title, post_content}=data[key]

          html+= `
            <div class="post">
            <h1>${title}</h1>
            <p>${post_content}</p>
          `
       }
       table.innerHTML=html
    })
  }
  GetPostData()