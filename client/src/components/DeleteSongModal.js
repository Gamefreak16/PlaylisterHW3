import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteSongModal() {
    const { store } = useContext(GlobalStoreContext);


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
                                Are you sure you wish to permanently delete <span>{}</span> from the playlist?
                            </div>
                        </div>
                        <div class="modal-footer">
                            <input type="button" 
                                id="delete-list-confirm-button" 
                                class="modal-button" 
                                //onClick={}
                                value='Confirm' />
                            <input type="button" 
                                id="delete-list-cancel-button" 
                                class="modal-button" 
                                //onClick={}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    
}
export default DeleteSongModal;