const socket = require('./socket');
const EventType = require('./types/pollsType');

module.exports = {
  type: EventType,
  subscribe: () => socket.asyncIterator('EVENT_CREATED')
};