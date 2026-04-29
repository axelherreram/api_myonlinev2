const TimelineEvento = require("../models/TimelineEvento");

/**
 * Adds an event to the timeline.
 * 
 * @param {number} user_id - The ID of the user performing the event.
 * @param {string} typeEvent - The type of the event (e.g., "task created", "task updated").
 * @param {string} descripcion - A description of the event that provides more details.
 * @param {number|null} [task_id=null] - An optional task ID associated with the event.
 */
async function addTimeline(user_id, typeEvent, descripcion, task_id) {
  try {
    if (!user_id || !typeEvent || !descripcion ) {
      console.error("Faltan datos para registrar el evento de timeline");
      return;
    }

    await TimelineEvento.query().insert({
      user_id,
      typeEvent,
      descripcion,
      task_id: task_id || null
      // date is handled automatically by the DB default (CURRENT_TIMESTAMP)
    });
    
    console.log('Timeline event added successfully');
  } catch (err) {
    console.error("Error al registrar en la línea de tiempo:", err.message || err);
  }
}

module.exports = { addTimeline };
