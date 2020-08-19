import {getDateStr} from '../utils/date_utils.js';
import {MockGoalId} from './goal_backend_handler.js';
import BackendAjaxHandler from './backend_ajax_handler.js';
import Status from '../common/status.js';

class TaskBackendHandlerClass
{
    constructor()
    {
        const yesterdayDateStr = getDateStr(_getTodayPlusDelta(-1));
        const todayDateStr = getDateStr(new Date());
        const tomorrowDateStr = getDateStr(_getTodayPlusDelta(1));

        this.taskId = 0;
        this.data = [
            {
                'id': ++this.taskId,
                'date': yesterdayDateStr,
                'name': 'Hack in all Flask routes as NodeJS and Express routes instead',
                'status': Status.COMPLETE,
                'is_planned': true,
                'notes': 'No database logic for now, just return valid dummy data',
                'goal_id': MockGoalId.NODEJS_MIGRATION
            },
            {
                'id': ++this.taskId,
                'date': yesterdayDateStr,
                'name': 'Clean up routing code',
                'status': Status.COMPLETE,
                'is_planned': true,
                'notes': '',
                'goal_id': MockGoalId.NODEJS_MIGRATION
            },
            {
                'id': ++this.taskId,
                'date': yesterdayDateStr,
                'name': 'Secure a route to the treasure room',
                'status': Status.COMPLETE,
                'is_planned': true,
                'notes': 'Looking',
                'goal_id': MockGoalId.TOP_SECRET
            },
            {
                'id': ++this.taskId,
                'date': yesterdayDateStr,
                'name': 'Make some curry',
                'status': Status.COMPLETE,
                'is_planned': false,
                'notes': '',
                'goal_id': MockGoalId.NONE
            },
            {
                'id': ++this.taskId,
                'date': todayDateStr,
                'name': 'Convert database logic to use NodeJS',
                'is_planned': true,
                'status': Status.IN_PROGRESS,
                'notes': 'Try looking into the node sqlite3 module (https://www.npmjs.com/package/sqlite3)',
                'goal_id': MockGoalId.NODEJS_MIGRATION,
            },
            {
                'id': ++this.taskId,
                'date': todayDateStr,
                'name': 'Read up on different headless browsers, APIs for controlling them',
                'is_planned': true,
                'status': Status.NOT_STARTED,
                'notes': 'Selenium? Puppeteer + Chrome? PhantomJS development suspended?',
                'goal_id': MockGoalId.INTEGRATED_TESTS,
            },
            {
                'id': ++this.taskId,
                'date': todayDateStr,
                'name': 'Fix bugs from routing cleanup',
                'is_planned': false,
                'status': Status.COMPLETE,
                'notes': 'Oops',
                'goal_id': MockGoalId.NODEJS_MIGRATION,
            },
            {
                'id': ++this.taskId,
                'date': todayDateStr,
                'name': 'Grocery run',
                'is_planned': false,
                'status': Status.COMPLETE,
                'notes': 'Somehow ran out of rice... also needed to buy more curry ingredients',
                'goal_id': MockGoalId.NONE,
            },
            {
                'id': ++this.taskId,
                'date': todayDateStr,
                'name': 'Send the calling card',
                'status': Status.COMPLETE,
                'is_planned': true,
                'notes': 'Cool',
                'goal_id': MockGoalId.TOP_SECRET
            },
            {
                'id': ++this.taskId,
                'date': tomorrowDateStr,
                'name': 'Select a headless browser, write tests for validating task view looks as expected',
                'is_planned': true,
                'status': Status.NOT_STARTED,
                'notes': '',
                'goal_id': MockGoalId.INTEGRATED_TESTS,
            },
            {
                'id': ++this.taskId,
                'date': tomorrowDateStr,
                'name': 'Steal the treasure!',
                'status': Status.NOT_STARTED,
                'is_planned': true,
                'notes': 'Joker',
                'goal_id': MockGoalId.TOP_SECRET
            },
        ];
    }

    dateTasksRouteHandler = (method, data) =>
    {
        if (method !== 'GET')
        {
            throw `Invalid /date_tasks method ${method}`;
        }

        let dateTasks = [];
        this.data.forEach((task) => {
            if (task.date === data['date'])
            {
                dateTasks.push(task);
            }
        });

        return {'tasks': dateTasks};
    }

    taskRouteHandler = (method, data) =>
    {
        switch (method)
        {
        case 'POST':
            break;

        case 'PUT':
            break;

        case 'DELETE':
            break;
        
        default:
            throw `Invalid /tasks method ${method}`;
        }

        console.log(data);
        return null;
    }
}

function _getTodayPlusDelta(deltaDays)
{
    let newDate = new Date();
    newDate.setDate(new Date().getDate() + deltaDays);
    return newDate;
}

let taskBackendHandler = new TaskBackendHandlerClass();
BackendAjaxHandler.addAjaxRouteHandler('/date_tasks', taskBackendHandler.dateTasksRouteHandler);
BackendAjaxHandler.addAjaxRouteHandler('/task', taskBackendHandler.taskRouteHandler);