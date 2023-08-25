import { useState } from "react"

export default function Profile({ user }) {
  const {username, image, email }=user
  
  console.log(user)
  function handleSubmit(){

  }
  const hiddenEmail= user.email.split('')
  for(let i=3; i< hiddenEmail.length; i++){
        hiddenEmail[i]="*"
      }
  hiddenEmail.join('')
  return (
    <div>
      <h1>{user.username}</h1>
      <p>{hiddenEmail}</p>
      <img src={image} alt='Profile Image'></img>
      <form onSubmit={handleSubmit}>
        <label htmlFor='about'>A little about you and your intrests or expertise</label>
        <textarea id='about' name='about' rows='5' col='30'></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
}


// export default function Profile({ user }) {
//   const {username, image, email }= user
  
//   function handleSubmit(){

//   }
//   console.log(user)

//   const hiddenEmail= email.split('');
//   for(let i=3; i< hiddenEmail.length; i++){
//         hiddenEmail[i]="*"
//       }
//   hiddenEmail.join('')
    
//   return (
//     <div>
//       <img src={image} alt='Profile image'>
//       <h1>{username}</h1>
//       <p>{hiddenEmail}</p>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor='about'>A little about you and your intrests or expertise</label>
//         <textarea id='about' name='about' rows='5' col='30'></textarea>
//         <button>Submit</button>
//       </form>
//     </div>
//   )
// }

