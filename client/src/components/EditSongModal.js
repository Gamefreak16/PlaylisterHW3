import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function EditSongModal () {
    const { store } = useContext(GlobalStoreContext);

    function editSong(event) {
        let oldSong = store.currentList.songs[store.markedSong];
        let newSong = {title: document.getElementById("editTitle").value, 
            artist: document.getElementById("editArtist").value, 
            youTubeId: document.getElementById("editId").value}
        store.addEditSongTransaction(oldSong, newSong, store.markedSong);
    }

    function handleCancel(event){
        store.hideEditSongModal()
    }    
     
    let song = {title:"", artist:"", youTubeId:""};
    if(store.currentList && store.markedSong !== null){
        song = store.currentList.songs[store.markedSong]
    }

    return (
        <div  
            class="modal" 
            id="edit-song-modal" 
            data-animation="slideInOutLeft">
            <div 
                class="modal-dialog" 
                id='verify-edit-song-root'>
                <div 
                    class="modal-header">
                    Edit Song
                </div>                
                <div 
                    class="modal-edit-center">
                    <div 
                        class="modal-center-content">
                                                        
                        <label 
                            for="editTitle" 
                            class="edit-labels"
                            >
                                Title:</label>
                        <input 
                            class="edit-input" 
                            type="text" 
                            id="editTitle"
                            defaultValue={song.title}></input><br></br>
                        <label 
                            for="editArtist" 
                            class="edit-labels"
                            >
                                Artist:</label>
                        <input 
                            class="edit-input" 
                            type="text" 
                            id="editArtist"
                            defaultValue={song.artist}></input><br></br>
                        <label 
                            for="editId" 
                            class="edit-labels"
                            >
                                YouTube Id:</label>
                        <input 
                        class="edit-input" 
                        type="text" 
                        id="editId"
                        defaultValue={song.youTubeId}></input><br></br>
                        
                    </div>
                </div>
                <div 
                    class="modal-footer">
                    <input 
                        type="button" 
                        id="edit-song-confirm-button" 
                        class="modal-button" 
                        value='Confirm'
                        onClick={editSong} 
                        />
                    <input 
                        type="button" 
                        id="edit-song-cancel-button" 
                        class="modal-button" 
                        value='Cancel'
                        onClick={handleCancel}

                        />
                </div>
            </div>
        </div>
    );
    
}

export default EditSongModal;