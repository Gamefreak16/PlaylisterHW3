

import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * @author McKilla Gorilla
 * @author ?
 */
 
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor( initStore, initTitle, initArtist, initId, initInd) {
        super();
        this.store = initStore
        this.title = initTitle;
        this.artist = initArtist;
        this.id = initId;
        this.index = initInd;
    }

    doTransaction() {
        this.store.addSong(this.title,this.artist,this.id,this.index);
    }
    
    undoTransaction() {
        this.store.deleteSong(this.index);
    }
}