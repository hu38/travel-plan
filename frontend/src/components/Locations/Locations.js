import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import LocationItem from './LocationItem/LocationItem';


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'snow',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'skyblue',
    padding: grid,
    width: 250
});

function Locations({ recommended, selected, handleUpdateRecommended, handleUpdateSelected }) {
    const [recommendedLocations, setRecommendedLocations] = useState(recommended);
    const [selectedLocations, setSelectedLocations] = useState(selected);
    
    useEffect(
        () => {
            handleUpdateRecommended(recommendedLocations);
        },
        [recommendedLocations]
    );
    useEffect(
        () => {
            handleUpdateSelected(selectedLocations);
        },
        [selectedLocations]
    );

    function getList(id) {
        return id === 'recommendedLocations' ? recommendedLocations : selectedLocations;
    }

    function onDragEnd(result) {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );
            source.droppableId === 'selectedLocations' ? setSelectedLocations(items) : setRecommendedLocations(items);
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );
            setRecommendedLocations(result.recommendedLocations);
            setSelectedLocations(result.selectedLocations);
        }
    };

    function handleOnDelete(place_id, source, listType) {
        const updatedSource = source.filter(place => place.place_id !== place_id);
        listType === 'selectedLocations' ? setSelectedLocations(updatedSource) : setRecommendedLocations(updatedSource);
    }

    return (
        <Row gutter={[16, 16]} style={{clear:'both'}}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Col>
                    <p style={{textAlign: 'center'}}><strong>SELECTED LOCATIONS</strong></p>
                    <Droppable droppableId="selectedLocations">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {selectedLocations.map((item, index) => (
                                    <Draggable
                                        key={item.place_id}
                                        draggableId={item.place_id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                <LocationItem location={item} onDelete={() => handleOnDelete(item.place_id, selectedLocations, 'selectedLocations')}/>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </Col>
                <Col>
                    <p style={{textAlign: 'center'}}><strong>RECOMMENDED LOCATIONS</strong></p>
                    <Droppable droppableId="recommendedLocations">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {recommendedLocations.map((item, index) => (
                                    <Draggable
                                        key={item.place_id}
                                        draggableId={item.place_id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                <LocationItem location={item} onDelete={() => handleOnDelete(item.place_id, recommendedLocations, 'recommendedLocations')} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </Col>

            </DragDropContext>
        </Row>
    );
}

export default Locations;
