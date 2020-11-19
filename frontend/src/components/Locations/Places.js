// @flow
import React, { memo, useState, useLayoutEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { areEqual } from "react-window";
import { List } from "react-virtualized";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "./style.css";
import getInitialData from "./get-initial-data";

function reorderList(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}


function getStyle({ draggableStyle, virtualStyle, isDragging }) {
    // If you don't want any spacing between your items
    // then you could just return this.
    // I do a little bit of magic to have some nice visual space
    // between the row items
    const combined = { ...virtualStyle, ...draggableStyle };

    // Being lazy: this is defined in our css file
    const grid = 2;

    // when dragging we want to use the draggable style for placement, otherwise use the virtual style
    const result = {
        ...combined,
        height: isDragging ? combined.height : combined.height - grid,
        left: isDragging ? combined.left : combined.left + grid,
        width: isDragging
            ? draggableStyle.width
            : `calc(${combined.width} - ${grid * 2}px)`,
        marginBottom: grid,
    };

    return result;
}

function Item({ provided, item, style, isDragging }) {
    return (
        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={getStyle({
                draggableStyle: provided.draggableProps.style,
                virtualStyle: style,
                isDragging,
            })}
            className={`item ${isDragging ? "is-dragging" : ""}`}
        >
            {item.text}
        </div>
    );
}

function Col({
    provided,
    column,
    index,
    style: virtualStyle,
    isDragging = false,
}) {
    console.log(provided, column, index)
    return (
        <div
            className="column"
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={getStyle({
                draggableStyle: provided.draggableProps.style,
                virtualStyle,
                isDragging,
            })}
        >
            <h3 className="column-title" {...provided.dragHandleProps}>
                {column.title}
            </h3>
            <ItemList column={column} index={index} />
        </div>
    );
}

// Recommended react-window performance optimisation: memoize the row render function
// Things are still pretty fast without this, but I am a sucker for making things faster
const Row = memo(function Row({ data: items, index, style }) {
    const item = items[index];

    // We are rendering an extra item for the placeholder
    if (!item) return null;

    return (
        <Draggable draggableId={item.id} index={index} key={item.id}>
            {(provided) => <Item provided={provided} item={item} style={style} />}
        </Draggable>
    );
}, areEqual);

const Column = memo(function Column({ columns, columnOrder, index, style }) {
    // find the corellates
    // const item = items[index];
    const column = columns[columnOrder[index]];

    // // We are rendering an extra item for the placeholder
    if (!column) return null;

    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <Col provided={provided} column={column} index={index} style={style} />
            )}
        </Draggable>
    );
}, areEqual);

const makeRowRenderer = (list) => ({
    index, // Index of row
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    key, // Unique key within array of rendered rows
    parent, // Reference to the parent List (instance)
    style, // Style object to be applied to row (to position it);
    // This must be passed through to the rendered row element.
}) => {
    // If row content is complex, consider rendering a light-weight placeholder while scrolling.
    // const content = isScrolling ? '...' : <User user={user} />;

    // Style is required since it specifies how the row is to be sized and positioned.
    // React Virtualized depends on this sizing/positioning for proper scrolling behavior.
    // By default, the List component provides following style properties:
    //    position
    //    left
    //    top
    //    height
    //    width
    // You can add additional class names or style properties as you would like.
    // Key is also required by React to more efficiently manage the array of rows.

    // We are rendering an extra item for the placeholder

    return <Row key={key} data={list} index={index} style={style} />;
};

const makeColumnRenderer = (columns, columnOrder) => ({
    index, // Index of row
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    key, // Unique key within array of rendered rows
    parent, // Reference to the parent List (instance)
    style, // Style object to be applied to row (to position it);
    // This must be passed through to the rendered row element.
}) => {
    // If row content is complex, consider rendering a light-weight placeholder while scrolling.
    // const content = isScrolling ? '...' : <User user={user} />;

    // Style is required since it specifies how the row is to be sized and positioned.
    // React Virtualized depends on this sizing/positioning for proper scrolling behavior.
    // By default, the List component provides following style properties:
    //    position
    //    left
    //    top
    //    height
    //    width
    // You can add additional class names or style properties as you would like.
    // Key is also required by React to more efficiently manage the array of rows.

    // We are rendering an extra item for the placeholder

    return (
        <Column
            key={key}
            columns={columns}
            columnOrder={columnOrder}
            index={index}
            style={style}
        />
    );
};

const ItemList = memo(function ItemList({ column, index }) {
    // There is an issue I have noticed with react-window that when reordered
    // react-window sets the scroll back to 0 but does not update the UI
    // I should raise an issue for this.
    // As a work around I am resetting the scroll to 0
    // on any list that changes it's index
    const listRef = useRef();
    useLayoutEffect(() => {
        const list = listRef.current;
        if (list) {
            list.scrollTo(0);
        }
    }, [index]);

    return (
        <Droppable
            droppableId={column.id}
            mode="virtual"
            renderClone={(provided, snapshot, rubric) => (
                <Item
                    provided={provided}
                    isDragging={snapshot.isDragging}
                    item={column.items[rubric.source.index]}
                />
            )}
        >
            {(provided, snapshot) => {
                // Add an extra item to our list to make space for a dragging item
                // Usually the DroppableProvided.placeholder does this, but that won't
                // work in a virtual list
                const itemCount = snapshot.isUsingPlaceholder
                    ? column.items.length + 1
                    : column.items.length;

                return (
                    <List
                        className="task-list"
                        height={500}
                        width={300}
                        rowHeight={80}
                        // deferredMeasurementCache={cache.current}
                        rowCount={itemCount}
                        rowRenderer={makeRowRenderer(column.items)}
                        ref={(ref) => {
                            // react-virtualized has no way to get the list's ref that I can so
                            // So we use the `ReactDOM.findDOMNode(ref)` escape hatch to get the ref
                            if (ref) {
                                const VirtualListRef = ReactDOM.findDOMNode(ref);
                                if (VirtualListRef instanceof HTMLElement)
                                    provided.innerRef(VirtualListRef);
                            }
                        }}
                    />
                );
            }}
        </Droppable>
    );
});

const ColList = memo(function ColList({ columnOrder, columns }) {
    
    return (
        <Droppable
            type="column"
            direction="vertical"
            droppableId="all-droppables"
            mode="virtual"
            renderClone={(provided, snapshot, rubric) => (
                <Col
                    provided={provided}
                    isDragging={snapshot.isDragging}
                    column={columns[columnOrder[rubric.source.index]]}
                    index={rubric.source.index}
                />
            )}
        >
            
            {(provided, snapshot) => {
                // Add an extra item to our list to make space for a dragging item
                // Usually the DroppableProvided.placeholder does this, but that won't
                // work in a virtual list
                const itemCount = snapshot.isUsingPlaceholder
                    ? columnOrder.length + 1
                    : columnOrder.length;

                return (
                    <List
                        height={800}
                        width={500}
                        rowHeight={500}
                        // deferredMeasurementCache={cache.current}
                        rowCount={itemCount}
                        rowRenderer={makeColumnRenderer(columns, columnOrder)}
                        ref={(ref) => {
                            // react-virtualized has no way to get the list's ref that I can so
                            // So we use the `ReactDOM.findDOMNode(ref)` escape hatch to get the ref
                            if (ref) {
                                const VirtualListRef = ReactDOM.findDOMNode(ref);
                                if (VirtualListRef instanceof HTMLElement)
                                    provided.innerRef(VirtualListRef);
                            }
                        }}
                    />
                );
            }}
        </Droppable>
    );
});

function Places() {
    const [state, setState] = useState(() => getInitialData());
    const [showSelected, setShowSelected] = useState(false);
    const [showRecommended, setShowRecommended] = useState(false);

    function onDragEnd(result) {
        if (!result.destination) return;

        if (result.type === "column") {
            
            const columnOrder = reorderList(
                state.columnOrder,
                result.source.index,
                result.destination.index,
            );
            setState({ ...state, columnOrder });
            return;
        }

        // reordering in same list
        if (result.source.droppableId === result.destination.droppableId) {
            const column = state.columns[result.source.droppableId];
            const items = reorderList(
                column.items,
                result.source.index,
                result.destination.index,
            );

            // updating column entry
            const newState = {
                ...state,
                columns: { ...state.columns, [column.id]: { ...column, items } },
            };
            setState(newState);
            return;
        }

        // moving between lists
        const sourceColumn = state.columns[result.source.droppableId];
        const destinationColumn = state.columns[result.destination.droppableId];
        const item = sourceColumn.items[result.source.index];

        // 1. remove item from source column
        const newSourceColumn = { ...sourceColumn, items: [...sourceColumn.items] };
        newSourceColumn.items.splice(result.source.index, 1);

        // 2. insert into destination column
        const newDestinationColumn = {
            ...destinationColumn,
            items: [...destinationColumn.items],
        };
        // in line modification of items
        newDestinationColumn.items.splice(result.destination.index, 0, item);

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newSourceColumn.id]: newSourceColumn,
                [newDestinationColumn.id]: newDestinationColumn,
            },
        };

        setState(newState);
    }

    function handleShow(type) {
        type === 'selected' ? setShowSelected(!showSelected) : setShowRecommended(!showRecommended);
    }

    console.log(state.columns);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="app">
                <ColList columnOrder={state.columnOrder} columns={state.columns} />
            </div>
        </DragDropContext>
    );
}

export default Places;
