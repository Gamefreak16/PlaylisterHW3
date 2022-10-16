
import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * @author McKilla Gorilla
 * @author ?
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldSong, initNewSong, initId) {
        super();
        this.store = initStore;
        this.oldTitle = initOldSong.title;
        this.oldArtist = initOldSong.artist;
        this.oldYoutube = initOldSong.youTubeId;
        this.newTitle = initNewSong.title;
        this.newArtist = initNewSong.artist;
        this.newYoutube = initNewSong.youTubeId;
        this.Id = initId;
    }

    doTransaction() {
        this.store.editSong(this.newTitle, this.newArtist, this.newYoutube, this.Id);
    }
    
    undoTransaction() {
        this.store.editSong(this.oldTitle, this.oldArtist, this.oldYoutube, this.Id);
    }
}