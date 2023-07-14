import {App, Credentials} from 'realm-web'

const APP_ID = "edapp-ilowl"
const r_app = new App({id:APP_ID});
var user;

async function createUser(email, password) {
    try {
        // register user
        await r_app.emailPasswordAuth.registerUser({email, password});
    } catch (e) {
        // alert of error
        throw e
    }
}

async function loginUser(email, password) {
    try {
        // login after successful registration
        const credentials = Credentials.emailPassword(email, password)
        const authuser = await r_app.logIn(credentials)
        user = authuser;
    } catch (e) {
        //console.log("login error: \n" + e)
        throw e
        return "login error!"
    }
}

async function fetchUser() {
    if(!r_app.currentUser) return false;
    try {
        await r_app.currentUser.refreshCustomData();
        return r_app.currentUser;
    } catch (e) {
        throw e;
    }
}

async function logoutUser() {
    if(!r_app.currentUser) return false;
    try {
        await r_app.currentUser.logOut();
        return true;
    } catch (e) {
        throw e;
    }
}

export default {r_app, user, createUser, loginUser, fetchUser, logoutUser}
// allows for use of realm within setup scripts
//export const useRealm = () => ({r_app})