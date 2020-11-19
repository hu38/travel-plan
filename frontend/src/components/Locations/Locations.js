import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Affix } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import LocationItem from './LocationItem/LocationItem';
import { Fab } from '@material-ui/core';
import ReactGoogleMaps from '../Google JavaScript API/ReactGoogleMaps';


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    console.log(list, startIndex, endIndex);
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
    // padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'snow',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'skyblue',
    padding: grid,
    width: 200
});

function Locations({ recommended, handleUpdateRecommended, selected, 
    handleUpdateSelected, recomendLoading, cityResult, encodedRoute }) {
    const [recommendedLocations, setRecommendedLocations] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [showSelected, setShowSelected] = useState(true);
    const [showRecommended, setShowRecommended] = useState(true);

    function getList(id) {
        return id === 'recommendedLocations' ? recommended : selected;
    }

    function onDragEnd(result) {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        console.log(result);
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );
            console.log('items', items);
            if (source.droppableId === 'selectedLocations' ) {
                // setSelectedLocations(items);
                handleUpdateSelected(items);
            } else {
                // setRecommendedLocations(items);
                handleUpdateRecommended(items);
            };
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );
            console.log('move', result);
            // setSelectedLocations(result.selectedLocations);
            // setRecommendedLocations(result.recommendedLocations);
            handleUpdateSelected(result.selectedLocations);
            handleUpdateRecommended(result.recommendedLocations);
        }
    };

    function handleOnDelete(place_id, source, listType) {
        const updatedSource = source.filter(place => place.place_id !== place_id);
        listType === 'selectedLocations' ? setSelectedLocations(updatedSource) : setRecommendedLocations(updatedSource);
    }

    function renderSelected() {
        console.log('selected', selected);
        return (
            <Droppable droppableId="selectedLocations"
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {selected.map((item, index) => (
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
                                        <LocationItem location={item} onDelete={() => handleOnDelete(item.place_id, selectedLocations, 'selectedLocations')} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }

    function renderRecommended() {
        console.log('recommended', recommended);
        return (
            <Droppable droppableId="recommendedLocations" >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {recommended.map((item, index) => (
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
                                        <LocationItem location={item}
                                            onDelete={() => handleOnDelete(item.place_id, recommendedLocations, 'recommendedLocations')} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }

    function handleShow(type) {
        type === 'selected' ? setShowSelected(!showSelected) : setShowRecommended(!showRecommended);
    }

    return (

        <Row gutter={[16, 16]} style={{ clear: 'both' }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Col>
                    <Fab variant="extended" color="error" onClick={() => handleShow('selected')}> Selected </Fab>
                    {showSelected ? renderSelected() : null}
                </Col>
                {/* <Col>
                    <>
                        <ReactGoogleMaps cityResult={cityResult} recomendCityList={recommended} encodedRoute={encodedRoute} />
                    </>
                </Col> */}
                <Col >
                    <Fab variant="extended" color="error" onClick={() => handleShow('recommended')}> Recommended </Fab>
                    {showRecommended ? renderRecommended() : null}
                </Col>

            </DragDropContext>
        </Row>
    );
}

export default Locations;
