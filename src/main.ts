import Player from "./player";

const app = document.getElementById('app')!
app.innerHTML = `<div id="player"></div>`

new Player({
    el: document.getElementById('player')!,
});

// pwa-register
import {registerSW} from 'virtual:pwa-register'

registerSW({
    onNeedRefresh() {
    },
    onOfflineReady() {
    },
})