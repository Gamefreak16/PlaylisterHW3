import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteListModal(){
        const { store } = useContext(GlobalStoreContext);

        function handleConfirm(event){
            store.deleteMarked();
        }

        function handleCancel(event){
            store.hideDeleteListModal()
        }

        let name = "";
        if(store.markedPair !== null){ name = store.markedPair.name}

        return (
            <div 
                class="modal" 
                id="delete-list-modal" 
                data-animation="slideInOutLeft">
                    <div class="modal-dialog" id='verify-delete-list-root'>
                        <div class="modal-header">
                            Delete playlist?
                        </div>
                        <div class="modal-center">
                            <div class="modal-center-content">
                                Are you sure you wish to permanently delete the <span>{name}</span> playlist?
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
export default DeleteListModal;