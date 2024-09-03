 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
  import { getDatabase, set, ref, get, remove, update } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
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

  const auth = getAuth(app)
  const db = getDatabase(app)

  const my_blog = document.querySelector('.my_blog')
  const login = document.querySelector('.login')

  onAuthStateChanged(auth,(user)=>{
   if(user){
      my_blog.classList.add('show')
      login.classList.add('hide')
    }
   else{
      my_blog.classList.remove('show')
      login.classList.remove('hide')
    }
  })

  function SignInUser(){
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        console.log(userCredential.user.uid);
    })
  }

  const signin = document.querySelector('#signin')
  signin.addEventListener('click', SignInUser)

  const signout = document.querySelector('#logout')
  signout.addEventListener('click', ()=>{
    signOut(auth).then(()=>{

    }).catch((error)=>{
     console.log("error" +error);
   } )
  } )

  //blog content

  const notifi = document.querySelector('.notifi')

  const add_post_btn = document.querySelector('.post_btn')

    function Add_Post(){
        const title = document.querySelector('#title').value;
        const post_content = document.querySelector('#post_content').value;
        const id = Math.floor(Math.random()*100)

        set(ref(db, 'post/'+id),{
            title:title,
            post_content:post_content
        })
        notifi.innerHTML = "Data Added";
        document.querySelector('#title').value=" ";
        document.querySelector('#post_content').value=" ";
   GetPostData()
    }

  add_post_btn.addEventListener('click', Add_Post)

  //get Data

  function GetPostData() {
    const user_ref=ref(db, 'post/')
    get(user_ref).then((snapshot)=>{
      const data=snapshot.val()
      
       let html= "";
       const table=document.querySelector('table')
       for(const key in data){
        const{title, post_content}=data[key]

          html+= `
            <tr>
             <td><span class="postNumber"></span></td><td> ${title} </td>
             <td><button class="delete" onClick="delete_data(${key})">Delete</button></td>
             <td><button class="update" onClick="update_data(${key})">Update</button></td>
            </tr> 
          `
       }
       table.innerHTML=html
    })
  }
  GetPostData()

  //delete function

  Window.delete_data=function(key){
    remove(ref(db, 'post/${key}'))
    notifi.innerHTML="data deleted"
    GetPostData()
  }

  //update data

  Window.update_data=function(key){
    const user_ref=ref(db, 'post/${key}')
    get(user_ref).then((item)=>{
       document.querySelector('#title').value=item.val().title;
       document.querySelector('#post_content').value=item.val().post_content;
    })
       const update_btn=document.querySelector('.update_btn')
       update_btn.classList.add('show')
       document.querySelector('.post_btn').classList.add('hide')

       
       function Update_Form(){
        const title = document.querySelector('#title').value;
        const post_content = document.querySelector('#post_content').value;

        update(ref(db, 'post/${key}'),{
          title:title,
          post_content:post_content
        })

        GetPostData()
       }
       
      update_btn.addEventListener('click', Update_Form) 
    
  }
  