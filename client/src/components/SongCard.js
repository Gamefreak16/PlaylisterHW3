import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    const [isDragging, setDragging] = useState(false);
    const [draggedTo, setTo] = useState(false);

    const { song, index } = props;
    let cardClass = "list-card unselected-list-card ";

    function handleDragStart(event) {
        event.dataTransfer.setData("song", event.target.id);
        
        setDragging(true);
        //setTo(draggedTo);
    }
    function handleDragOver(event) {
        event.preventDefault();
        setTo(true);
        // this.setState(prevState => ({
        //     isDragging: prevState.isDragging,
        //     draggedTo: true
        // }));
    }
    function handleDragEnter(event) {
        event.preventDefault();
        setTo(true);
        // this.setState(prevState => ({
        //     isDragging: prevState.isDragging,
        //     draggedTo: true
        // }));
    }
    function handleDragLeave(event) {
        event.preventDefault();
        setTo(false);
        // this.setState(prevState => ({
        //     isDragging: prevState.isDragging,
        //     draggedTo: false
        // }));
    }
    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        targetId = targetId.substring(0, targetId.indexOf("-"));
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        sourceId = sourceId.substring(0, sourceId.indexOf("-"));
        setDragging(false);
        setTo(false);
        // ASK THE MODEL TO MOVE THE DATA
        sourceId = parseInt(sourceId);
        targetId = parseInt(targetId);
        store.addMoveSongTransaction(sourceId, targetId);
    }

    function handleDelete(event){
        event.stopPropagation();
        store.markSong(index);
        store.showDeleteSongModal();
    }

    function provokeEdit(event){
        if(event.detail === 2){
            store.markSong(index);
            store.showEditSongModal();
        }
    }

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={provokeEdit}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={handleDelete}
            />
        </div>
    );
}

export default SongCard;