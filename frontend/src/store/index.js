import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userId: '',
        userToken: '',
        isLogged: false,
        userEmail: '',
        userName: '',
        userFirstname: '',
        userPicture: '',
        userRole: '',
        userBirthday: '',
    },
    getters: {
        isLogged: (state) => {
            return state.isLogged;
        },
        userFirstname: (state) => {
            return state.userFirstname
        }
    },
    mutations: {
        CHECK_TOKEN(state) {
            try {
                jwt.verify(state.userToken, 'RANDOM_TOKEN');
                state.isValid = 'ok';
                state.isLogged = true;
                return true;
            } catch (error) {
                state.isValid = "expiry";
                state.isLogged = false;
                this.commit('LOGOUT');
                this.commit('CLEAR_STATE');
                return false;
            }
        },
        LOGOUT(state) {
            this.userToken = '';
            state.isLogged = false;
        },
        CLEAR_STATE(state) {
            state.userToken = '',
                state.userId = '',
                state.isLogged = false,
                state.userName = '',
                state.userFirstname = '',
                state.userEmail = '',
                state.userRole = '',
                state.userBirthday = '';
        }
    },
    actions:
        {
            getOneUser(context) {
                axios.get('http://localhost:3000/user/profile/' + context.state.userId, {
                    headers: {
                        'Authorization': `token ${context.state.userToken}`
                    }
                })
                    .then(result => {
                        this.state.userFirstname = result.data[0].firstname;
                        this.state.userName = result.data[0].name;
                        this.state.userEmail = result.data[0].email;
                        this.state.userPicture = result.data[0].profile_picture;
                        this.state.userPassword = result.data[0].password;
                        this.state.userBirthday = result.data[0].date_of_birth;
                        this.state.userRole = result.data[0].role;
                    })
                    .catch(error => {
                        console.log("Aucun utilisateur connecté", error);
                    })
            },
        },
    modules: {}
});
