import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function EditSongModal () {
    const { store } = useContext(GlobalStoreContext);

    function editSong(event) {
        let newTitle = document.getElementById("editTitle").value; 
        let newArtist = document.getElementById("editArtist").value;
        let newYou = document.getElementById("editId").value;
        this.props.editSongCallback(newTitle, newArtist, newYou);
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
                                defaultValue={""}></input><br></br>
                            <label 
                                for="editArtist" 
                                class="edit-labels"
                                >
                                    Artist:</label>
                            <input 
                                class="edit-input" 
                                type="text" 
                                id="editArtist"
                                defaultValue={""}></input><br></br>
                            <label 
                                for="editId" 
                                class="edit-labels"
                                >
                                    YouTube Id:</label>
                            <input 
                            class="edit-input" 
                            type="text" 
                            id="editId"
                            defaultValue={""}></input><br></br>
                            
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
                            onClick={store.hideEditSongModalCallback}

                            />
                    </div>
                </div>
            </div>
        );
    
}

export default EditSongModal;