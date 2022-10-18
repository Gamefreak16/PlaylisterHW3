import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function handleConfirm(event){
        let song = store.currentList.songs[store.markedSong];
        store.addDeleteSongTransaction(song.title,song.artist,song.youTubeId,store.markedSong);
    }

    function handleCancel(event){
        store.hideDeleteSongModal()
    }

    let name = "";
    if(store.currentList !== null && store.markedSong !== null){
        name = store.currentList.songs[store.markedSong].title
    }

    return (
        <div 
            class="modal" 
            id="delete-song-modal" 
            data-animation="slideInOutLeft">
                <div class="modal-dialog" id='verify-delete-list-root'>
                    <div class="modal-header">
                        Delete song?
                    </div>
                    <div class="modal-center">
                        <div class="modal-center-content">
                            Are you sure you wish to permanently delete <span>{name}</span> from the playlist?
                        </div>
                    </div>
                    <div class="modal-footer">
                        <input type="button" 
                            id="delete-list-confirm-button" 
                            class="modal-button" 
                            onClick={handleConfirm}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-list-cancel-button" 
                            class="modal-button" 
                            onClick={handleCancel}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
    
}
export default DeleteSongModal;