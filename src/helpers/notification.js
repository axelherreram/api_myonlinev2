const Notification = require("../models/Notification");

/**
 * Creates a new notification entry in the database.
 *
 * @param {string} notification_text - The content of the notification.
 * @param {number} student_id - The ID of the student receiving the notification.
 * @param {number} task_id - The ID of the related task.
 * @param {string} type_notification - The type of notification, either "student" or "general".
 */
async function createNotification(
  notification_text,
  student_id,
  task_id,
  type_notification
) {
  try {
    if (!notification_text || !student_id || !task_id || !type_notification) {
      console.error("Required parameters are missing:", {
        notification_text,
        student_id,
        task_id,
        type_notification,
      });
      return;
    }

    await Notification.query().insert({
      notification_text,
      student_id,
      task_id,
      type_notification,
    });
    console.log('Notification created successfully');
  } catch (err) {
    console.error("Error creating notification:", err);
  }
}

module.exports = { createNotification };
