import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import * as TicketsActions from '../actions/TicketsActions';

import Loader from '../components/Loader';
import KanbanColumn from '../components/KanbanColumn';
import StorageButtons from '../components/StorageButtons';
import Card from '../components/Card';

class KanbanBoardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showItemCard: false,
      itemCardId: 0,
      columnName: ''
    }

    props.getTickets();

    this.onDragEnd = this.onDragEnd.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onLoadClick = this.onLoadClick.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
    this.onOpenCardClick = this.onOpenCardClick.bind(this);
    this.onCloseCardClick = this.onCloseCardClick.bind(this);
    this.onSaveCardClick = this.onSaveCardClick.bind(this);
  }

  onDragEnd(result) {
    const { source, destination, draggableId } = result;

    this.props.moveTicket({
      source: {
        name: source.droppableId,
        position: source.index
      },
      destination: {
        name: destination.droppableId,
        position: destination.index
      },
      draggableId
    });
  }

  onSaveClick() {
    const {
      discuss,
      toDo,
      inProgress,
      testing,
      done,
      setTickets
    } = this.props;

    setTickets({
      discuss: discuss.values,
      toDo: toDo.values,
      inProgress: inProgress.values,
      testing: testing.values,
      done: done.values
    });
  }

  onLoadClick() {
    this.props.getTickets();
  }

  onResetClick() {
    this.props.resetTickets();
  }

  onOpenCardClick(columnName, itemCardId) {
    console.log('onOpenCardClick', );

    this.setState({
      showItemCard: true,
      itemCardId,
      columnName
    })
  }

  onCloseCardClick() {
    this.setState({
      showItemCard: false,
      itemCardId: 0,
      columnName: ''
    })
  }

  onSaveCardClick(item) {
    console.log('onSaveCardClick');
  }

  render() {
    const {
      discuss,
      toDo,
      inProgress,
      testing,
      done,
      isFetching
    } = this.props;

    const {
      showItemCard,
      itemCardId,
      columnName
    } = this.state;

    if (isFetching) return (<Loader/>);

    // if (showItemCard && itemCardId && columnName)
    return (
      <div>
        <StorageButtons
          onSaveClick={this.onSaveClick}
          onLoadClick={this.onLoadClick}
          onResetClick={this.onResetClick}
        />
        {showItemCard && itemCardId && columnName && (
          <Card
            onCloseClick={this.onCloseCardClick}
            onSaveClick={this.onSaveCardClick}
            item={this.props[columnName].values.filter(item => item.id === itemCardId)[0]}
          />
        )}
        <div className="kanban-board">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <KanbanColumn
              droppableId="discuss"
              key="discuss"
              data={discuss}
              onItemClick={(id) => this.onOpenCardClick('discuss', id)}
            />
            <KanbanColumn
              droppableId="toDo"
              key="toDo"
              data={toDo}
              onItemClick={(id) => this.onOpenCardClick('toDo', id)}
            />
            <KanbanColumn
              droppableId="inProgress"
              key="inProgress"
              data={inProgress}
              onItemClick={(id) => this.onOpenCardClick('inProgress', id)}
            />
            <KanbanColumn
              droppableId="testing"
              key="testing"
              data={testing}
              onItemClick={(id) => this.onOpenCardClick('testing', id)}
            />
            <KanbanColumn
              droppableId="done"
              key="done"
              data={done}
              onItemClick={(id) => this.onOpenCardClick('done', id)}
            />
          </DragDropContext>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.tickets.isFetching,
    discuss: state.tickets.discuss,
    toDo: state.tickets.toDo,
    inProgress: state.tickets.inProgress,
    testing: state.tickets.testing,
    done: state.tickets.done,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    moveTicket: bindActionCreators(TicketsActions, dispatch).moveTicket,
    getTickets: bindActionCreators(TicketsActions, dispatch).getTickets,
    setTickets: bindActionCreators(TicketsActions, dispatch).setTickets,
    resetTickets: bindActionCreators(TicketsActions, dispatch).resetTickets,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoardContainer);
