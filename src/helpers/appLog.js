const AppLog = require('../models/AppLog');  

/**
 * Logs user activity to the AppLog model.
 * 
 * @param {number} user_id - The ID of the user performing the action.
 * @param {number|null} sede_id - The ID of the location (sede) where the action is performed.
 * @param {string} action - The action being performed (e.g., "create", "update", "delete").
 * @param {string} details - A detailed description of the action performed.
 */
async function logActivity(user_id, sede_id, action, details) {  
  try {
    if (!user_id || !action || !details) {
      console.error('Undefined or null parameters:', { user_id, action, details });
      return;
    }

    await AppLog.query().insert({
      user_id,
      sede_id: sede_id || null,  
      action,  
      details, 
    });
    console.log('Activity logged:', { user_id, action, details });
  } catch (err) {
    console.error('Error logging activity:', err);
  }
}

module.exports = { logActivity };
