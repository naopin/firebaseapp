<template>
  <div>
    <h1>ログイン画面</h1>
    <table>
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

    <button @click="login">ログイン</button>
    <br />
    <router-link to="/register">新規登録はこちらから</router-link>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push("/");
          const userdata = firebase.auth().currentUser;
          this.$store.commit('login', userdata);
          // const userdata = firebase.auth().currentUser;
          // console.log("アカウント作成", userdata);
        })
        .catch(error => {
          alert(error.message);
        });
      this.email = "";
      this.password = "";
    }
  }
};

</script>