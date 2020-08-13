import React from 'react';

import {ajaxPut} from '../common/ajax.js';
import {CrossButton} from '../common/svg_buttons.js';
import TaskForm from './task_form.js';

export default class ModalTaskEditForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            'date': this.props.task.date,
            'name': this.props.task.name,
            'goal': this.props.task.goal_id,
            'isPlanned': this.props.task.isPlanned,
            'status': this.props.task.status,
            'notes': this.props.task.notes,
        };
    }

    _handleFieldChange = (fieldName, value) =>
    {
        const newState = {};
        newState[fieldName] = value;
        this.setState(newState);
    }

    _handleSubmit = (task) =>
    {
        ajaxPut('/task', task).done(() => {
            this.props.onTaskEntrySuccessful();
        });
    }

    render()
    {
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-content-header">
                        <h3>Edit Task</h3>
                        <CrossButton onClick={this.props.onClose} />
                    </div>
                    <TaskForm id={this.props.task.id} date={this.state.date} name={this.state.name} 
                        goal={this.state.goal} isPlanned={this.state.isPlanned} status={this.state.status}
                        notes={this.state.notes}
                        goals={this.props.goals}
                        onFieldChange={this._handleFieldChange}
                        onSubmitTask={this._handleSubmit}
                        showDateInput />
                </div>
            </div>
        );
    }
}
