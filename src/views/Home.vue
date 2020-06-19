<template>
  <div>
    <table>
      <tr>
        <td>
          <h2>{{user.displayName}}さんようこそ！</h2>
        </td>
        <td>
          <!-- <h2>残高:{{loginUser[0].balance}}</h2> -->
        </td>
        <td>
          <button @click="logout">ログアウト</button>
        </td>
      </tr>
    </table>
    <h1>ユーザー一覧</h1>
    <table>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.username">
          <td>{{item.username}}</td>
          <td>
            <div class="example-modal-window">
              <button @click="openModal">wallteを見る</button>

              <MyModal class="mymodal" @close="closeModal" v-if="modal">
                {{item.username}}
                <template slot="footer">
                  <button @click="closeModal">閉じる</button>
                </template>
              </MyModal>
            </div>
          </td>
          <td>
            <button>送る</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { firebaseApp } from "../main";
import MyModal from "./MyModal";

export default {
  components: { MyModal },
  name: "Home",
  data() {
    return {
      userInfo: "",
      balance: "",
      items: [],
      filteredItems: [],
      loginUser: "",
      modal: false
    };
  },
  methods: {
    ...mapActions(["setUser"]),
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // this.$router.push("/login");
        })
        .catch(error => {
          alert(error.message);
        });
    },
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    }
    // doSend() {
    //   if (this.message.length > 0) {
    //     alert(this.message)
    //     this.message = ''
    //     this.closeModal()
    //   } else {
    //     alert('メッセージを入力してください')
    //   }
    // }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.$nextTick(function() {
      const self = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          const userInfo = user;
          self.setUser(userInfo);

          firebaseApp
            .firestore()
            .collection("users")
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                self.items.push(doc.data());
              });

              self.filteredItems = self.items.filter(function(item) {
                return (
                  item.username !== firebase.auth().currentUser.displayName
                );
              });

              self.wallet = self.filteredItems.filter(function(item) {
                return (
                  item.username !== firebase.auth().currentUser.displayName
                );
              });

              console.log("loginUser", self.filteredItems);
              self.loginUser = self.items.filter(function(item) {
                return (
                  item.username === firebase.auth().currentUser.displayName
                );
              });
              // console.log('loginUser',self.loginUser)
            });
        } else {
          self.$router.push("/login");
        }
      });
    });
  }
  //  mounted() {
  //   firebaseApp
  //     .firestore()
  //     .collection("users")
  //     .doc("nao@nao.com")
  //     .get()
  //     .then(doc => {
  //       console.log(doc.data().balance);
  //     });
  // },
};
</script>




