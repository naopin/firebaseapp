<template>
  <div>
    <h1>新規登録画面</h1>
    <table>
      <tr>
        <td>
          <label class="label" for="username">UserName</label>
        </td>
        <td>
          <input id="username" type="text" v-model="username" />
        </td>
      </tr>
      <tr>
        <td>
          <label for="email">E-mail</label>
        </td>
        <td>
          <input id="email" type="email" v-model="email" />
        </td>
      </tr>

      <tr>
        <td>
          <label for="password">Password</label>
        </td>
        <td>
          <input id="password" type="password" v-model="password" />
        </td>
      </tr>
    </table>
    <br />
    <br />

    <button @click="register">新規登録</button>
    <br />
    <router-link to="/login">ログインはこちらから</router-link>
  </div>
</template>

<style>
table {
  margin: 0 auto;
}
button {
  padding: 8px 15px;
  border-radius: 5px;
}
</style>


<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseApp } from '../main';

export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register: function() {
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          
          firebaseApp
            .auth()
            .currentUser.updateProfile({ displayName: this.username });

           let db = firebase.firestore();
        db.collection("users")
          .doc(this.email)
          .set({
            nick_name: this.username,
            budget: 1000,
          })
          
          this.username = "";
          this.email = "";
          this.password = "";
          this.$router.push("/");

        })
        .catch(error => {
          alert(error.message);
        });
    }
   
  }
  
};
</script>
