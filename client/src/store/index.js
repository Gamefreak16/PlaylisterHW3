import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction.js';
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction';
import AddSong_Transaction from '../transactions/AddSong_Transaction';
import EditSong_Transaction from '../transactions/EditSong_Transaction';
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    CONFIRM_DELETE_LIST: "CONFIRM_DELETE_LIST",
    CANCEL_DELETE_LIST: "CANCEL_DELETE_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    ADDED_SONG: "ADDED_SONG",
    DELETED_SONG: "DELETED_SONG",
    EDITED_SONG: "EDITED_SONG",
    MOVED_SONG: "MOVED_SONG",
    MARK_SONG: "MARK_SONG",

}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        markedPair: null,
        markedSong: null
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedPair: null,
                    markedSong: null
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedPair: null,
                    markedSong: null
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    markedPair: null,
                    markedSong: null
                })
            }
            case GlobalStoreActionType.CONFIRM_DELETE_LIST: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter - 1,
                    listNameActive: false,
                    markedPair: null,
                    markedSong: null
                })
            }
            case GlobalStoreActionType.CANCEL_DELETE_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedPair: null,
                    markedSong: null
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedPair: null,
                    markedSong: null
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedPair: payload,
                    markedSong: null
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedPair: null,
                    markedSong: null
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    markedPair: null,
                    markedSong: null
                });
            }
            case GlobalStoreActionType.ADDED_SONG: {
                return setStore({
                    idNamePairs: payload,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedPair: null,
                    markedSong: null
                });
            }
            case GlobalStoreActionType.MARK_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedPair: null,
                    markedSong: payload
                });
            }
            case GlobalStoreActionType.DELETED_SONG: {
                return setStore({
                    idNamePairs: payload,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedPair: null,
                    markedSong: null
                });
            }
            case GlobalStoreActionType.EDITED_SONG: {
                return setStore({
                    idNamePairs: payload,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedPair: null,
                    markedSong: null
                });
            }
            case GlobalStoreActionType.MOVED_SONG: {
                return setStore({
                    idNamePairs: payload,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedPair: null,
                    markedSong: null
                });
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    store.createNewList = function () {
        async function asyncCreateNewList() {
            let playlist = {name: "New Playlist"};
            let response = await api.createPlaylist(playlist);
            if (response.data.success) {
                playlist = response.data.playlist;
                async function getListPairs(playlist){
                    response = await api.getPlaylistPairs();
                    if(response.data.success){
                        let pairsArray = response.data.idNamePairs;       
                        storeReducer({
                            type: GlobalStoreActionType.CREATE_NEW_LIST,
                            payload:{
                                idNamePairs: pairsArray,
                                playlist: playlist
                            }
                        });
                        store.history.push("/playlist/" + playlist._id);
                    }
                }
                getListPairs(playlist);
            }
        }
        asyncCreateNewList();

    }

    store.markListForDeletion = function (pair) {
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload:pair
        })
        store.showDeleteListModal();
    }

    store.deleteMarked = function (){
        async function asyncDeleteMark(){
            let response = await api.deletePlaylist(store.markedPair._id)
            if(response.data.success){
                async function getListPairs(){
                    response = await api.getPlaylistPairs();
                    if(response.data.success){
                        let pairsArray = response.data.idNamePairs;  
                        store.hideDeleteListModal();     
                        storeReducer({
                            type: GlobalStoreActionType.CONFIRM_DELETE_LIST,
                            payload:pairsArray
                        });
                        
                    }
                }
                getListPairs();
            }
        }
        asyncDeleteMark();
    }

    store.showDeleteListModal = function () {
        let modal = document.getElementById("delete-list-modal");
        modal.classList.add("is-visible");
    }
    // THIS FUNCTION IS FOR HIDING THE MODAL
    store.hideDeleteListModal = function () {
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
        storeReducer({
            type: GlobalStoreActionType.CANCEL_DELETE_LIST,
            payload:null
        });
    }

    store.addAddSongTransaction = () => {
        let transaction = new AddSong_Transaction(store);
        tps.addTransaction(transaction);
    }

    store.addAddSongTransaction = (songTitle, songArtist, songId, songIndex) => {
        let setIndex = songIndex;
        if(setIndex === undefined) setIndex = store.getPlaylistSize();
        let transaction = new AddSong_Transaction(store, songTitle, songArtist, songId, setIndex);
        tps.addTransaction(transaction);
    }


    store.addSong = (songTitle, songArtist, songId, songIndex) =>{
        let list = store.currentList;
        if(store.currentList){
            let temp = {};
            if(songTitle !== undefined) temp.title = songTitle;
            else temp.title = "Untitled";
            if(songArtist !== undefined) temp.artist = songArtist;
            else temp.artist = "Unknown";
            if(songId !== undefined) temp.youTubeId = songId;
            else temp.youTubeId = "dQw4w9WgXcQ";
            if(songIndex !== undefined) list.songs.splice(songIndex,0,temp);
            else list.songs.push(temp);

            async function updateList(playlist) {
                let response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    async function getListPairs(playlist) {
                        response = await api.getPlaylistPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.ADDED_SONG,
                                payload: pairsArray
                            });
                        }
                    }
                    getListPairs(playlist);
                }
            }
            updateList(list);


        }
        
    }

    store.markSong = function (index) {
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG,
            payload:index
        })
    }


    store.addDeleteSongTransaction = (songTitle, songArtist, songId, songIndex) => {
        let setIndex = songIndex;
        if(setIndex === undefined) setIndex = store.getPlaylistSize();
        let transaction = new DeleteSong_Transaction(store, songTitle, songArtist, songId, setIndex);
        tps.addTransaction(transaction);
        store.hideDeleteSongModal()
    }

    store.deleteSong = (index) => {
        let list = store.currentList;
        if(store.currentList){
            list.songs.splice(index,1);
        }
        
        
        async function updateList(playlist) {
            let response = await api.updatePlaylistById(playlist._id, playlist);
            if (response.data.success) {
                async function getListPairs(playlist) {
                    response = await api.getPlaylistPairs();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        storeReducer({
                            type: GlobalStoreActionType.DELETED_SONG,
                            payload: pairsArray
                        });
                        
                    }
                }
                getListPairs(playlist);
            }
        }
        updateList(list);
    }


    store.showDeleteSongModal = function () {
        let modal = document.getElementById("delete-song-modal");
        modal.classList.add("is-visible");
    }
    // THIS FUNCTION IS FOR HIDING THE MODAL
    store.hideDeleteSongModal= function() {
        let modal = document.getElementById("delete-song-modal");
        modal.classList.remove("is-visible");
    }


    store.editSong = (newTitle, newArtist, newYoutube, newIndex) =>{
        let list = store.currentList;
        if(store.currentList){
            let temp = {};
            if(newTitle !== undefined && newTitle !== "") temp.title = newTitle;
            else temp.title = "Untitled";
            if(newArtist !== undefined && newArtist !== "") temp.artist = newArtist;
            else temp.artist = "Unknown";
            if(newYoutube !== undefined && newYoutube !== "") temp.youTubeId = newYoutube;
            else temp.youTubeId = "dQw4w9WgXcQ";
            list.songs.splice(newIndex, 1, temp); 
        }

        async function updateList(playlist) {
            let response = await api.updatePlaylistById(playlist._id, playlist);
            if (response.data.success) {
                async function getListPairs(playlist) {
                    response = await api.getPlaylistPairs();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        storeReducer({
                            type: GlobalStoreActionType.EDITED_SONG,
                            payload: pairsArray
                        });
                        
                    }
                }
                getListPairs(playlist);
            }
        }
        updateList(list);

    }



    store.addEditSongTransaction = (oldSong, newSong, index) => {
        let transaction = new EditSong_Transaction(store, oldSong, newSong, index);
        tps.addTransaction(transaction);
        store.hideEditSongModal()
    }



    store.showEditSongModal=function() {
        let modal = document.getElementById("edit-song-modal");
        modal.classList.add("is-visible");
    }
    // THIS FUNCTION IS FOR HIDING THE MODAL
    store.hideEditSongModal=function() {
        let modal = document.getElementById("edit-song-modal");
        modal.classList.remove("is-visible");
    }

    store.hasUndo = function(){
        return tps.hasTransactionToUndo();
    }

    store.hasRedo = function(){
        return tps.hasTransactionToRedo();
    }

    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong= (start, end) => {
        let list = store.currentList;
        // WE NEED TO UPDATE THE STATE FOR THE APP
        // start += 0;
        // end += 0;
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }
        async function updateList(playlist) {
            let response = await api.updatePlaylistById(playlist._id, playlist);
            if (response.data.success) {
                async function getListPairs(playlist) {
                    response = await api.getPlaylistPairs();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        storeReducer({
                            type: GlobalStoreActionType.MOVED_SONG,
                            payload: pairsArray
                        });
                    }
                }
                getListPairs(playlist);
            }
        }
        updateList(list);
        
    }
    // THIS FUNCTION ADDS A MoveSong_Transaction TO THE TRANSACTION STACK
    store.addMoveSongTransaction = (start, end) => {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }


    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        tps.clearAllTransactions();
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        if(tps.hasTransactionToUndo()) tps.undoTransaction();
    }
    store.redo = function () {
        if(tps.hasTransactionToRedo()) tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}