/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // 1. roles
    .createTable('roles', table => {
      table.increments('rol_id').primary();
      table.string('name', 100).notNullable();
    })
    // 2. year
    .createTable('year', table => {
      table.increments('year_id').primary();
      table.specificType('year', 'YEAR').notNullable().unique('uq_year');
    })
    // 3. sede
    .createTable('sede', table => {
      table.increments('sede_id').primary();
      table.string('nameSede', 200).notNullable().unique('uq_sede_name');
      table.string('address', 255).nullable();
    })
    // 4. course
    .createTable('course', table => {
      table.increments('course_id').primary();
      table.string('courseName', 255).notNullable();
    })
    // 5. typetask
    .createTable('typetask', table => {
      table.increments('typeTask_id').primary();
      table.string('name', 100).notNullable().unique('uq_typetask_name');
    })
    // 6. rolcomision
    .createTable('rolcomision', table => {
      table.increments('rol_comision_id').primary();
      table.string('rolComisionName', 100).notNullable();
    })
    // 7. user
    .createTable('user', table => {
      table.increments('user_id').primary();
      table.string('email', 200).notNullable().unique('uq_user_email');
      table.string('password', 200).notNullable();
      table.string('name', 200).notNullable();
      table.string('carnet', 25).nullable().unique('uq_user_carnet');
      table.integer('sede_id').unsigned().nullable().references('sede_id').inTable('sede');
      table.integer('rol_id').unsigned().notNullable().defaultTo(1).references('rol_id').inTable('roles');
      table.integer('year_id').unsigned().nullable().references('year_id').inTable('year');
      table.string('profilePhoto', 200).nullable();
      table.boolean('active').notNullable().defaultTo(true);
      table.boolean('passwordUpdate').notNullable().defaultTo(false);
    })
    // 8. coursesedeassignment
    .createTable('coursesedeassignment', table => {
      table.increments('asigCourse_id').primary();
      table.integer('course_id').unsigned().notNullable().references('course_id').inTable('course');
      table.integer('sede_id').unsigned().notNullable().references('sede_id').inTable('sede');
      table.integer('year_id').unsigned().notNullable().references('year_id').inTable('year');
      table.boolean('courseActive').notNullable().defaultTo(true);
      table.unique(['course_id', 'sede_id', 'year_id'], { indexName: 'uq_csassign' });
    })
    // 9. courseassignment
    .createTable('courseassignment', table => {
      table.increments('courseAssignment_id').primary();
      table.integer('student_id').unsigned().notNullable().references('user_id').inTable('user');
      table.integer('asigCourse_id').unsigned().notNullable().references('asigCourse_id').inTable('coursesedeassignment');
      table.float('note').nullable();
      table.unique(['student_id', 'asigCourse_id'], { indexName: 'uq_courseassign' });
    })
    // 10. task
    .createTable('task', table => {
      table.increments('task_id').primary();
      table.integer('asigCourse_id').unsigned().notNullable().references('asigCourse_id').inTable('coursesedeassignment');
      table.integer('typeTask_id').unsigned().notNullable().references('typeTask_id').inTable('typetask');
      table.string('title', 255).notNullable();
      table.text('description').notNullable();
      table.datetime('taskStart').notNullable();
      table.datetime('endTask').notNullable();
    })
    // 11. timelineeventos
    .createTable('timelineeventos', table => {
      table.increments('evento_id').primary();
      table.integer('user_id').unsigned().notNullable().references('user_id').inTable('user');
      table.string('typeEvent', 255).notNullable();
      table.string('descripcion', 255).notNullable();
      table.integer('task_id').unsigned().nullable().references('task_id').inTable('task');
      table.datetime('date').notNullable().defaultTo(knex.fn.now());
    })
    // 12. comments
    .createTable('comments', table => {
      table.increments('comment_id').primary();
      table.integer('user_id').unsigned().notNullable().references('user_id').inTable('user');
      table.integer('task_id').unsigned().notNullable().references('task_id').inTable('task');
      table.boolean('comment_active').notNullable().defaultTo(true);
    })
    // 13. commentversion
    .createTable('commentversion', table => {
      table.increments('commentVersion_id').primary();
      table.integer('comment_id').unsigned().notNullable().references('comment_id').inTable('comments');
      table.text('comment').notNullable();
      table.enum('role', ['student', 'teacher']).notNullable();
      table.datetime('datecomment').notNullable().defaultTo(knex.fn.now());
    })
    // 14. tasksubmissions
    .createTable('tasksubmissions', table => {
      table.increments('submission_id').primary();
      table.integer('user_id').unsigned().notNullable().references('user_id').inTable('user');
      table.integer('task_id').unsigned().notNullable().references('task_id').inTable('task');
      table.boolean('submission_complete').notNullable().defaultTo(false);
      table.string('file_path', 500).nullable();
      table.datetime('date').notNullable().defaultTo(knex.fn.now());
      table.unique(['user_id', 'task_id'], { indexName: 'uq_tasksubmit' });
    })
    // 15. thesissubmissions
    .createTable('thesissubmissions', table => {
      table.increments('thesisSubmissions_id').primary();
      table.integer('user_id').unsigned().notNullable().references('user_id').inTable('user');
      table.integer('task_id').unsigned().notNullable().references('task_id').inTable('task');
      table.string('file_path', 500).notNullable();
      table.datetime('date').notNullable().defaultTo(knex.fn.now());
      table.enum('approved_proposal', ['pending', 'approved', 'needs_changes', 'rejected']).notNullable().defaultTo('pending');
    })
    // 16. groupcomision
    .createTable('groupcomision', table => {
      table.increments('group_id').primary();
      table.integer('year_id').unsigned().notNullable().references('year_id').inTable('year');
      table.integer('sede_id').unsigned().notNullable().references('sede_id').inTable('sede');
      table.boolean('activeGroup').notNullable().defaultTo(true);
      table.datetime('createdAt').notNullable().defaultTo(knex.fn.now());
      table.datetime('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    })
    // 17. comisiones
    .createTable('comisiones', table => {
      table.increments('comision_id').primary();
      table.integer('group_id').unsigned().notNullable().references('group_id').inTable('groupcomision');
      table.integer('user_id').unsigned().notNullable().references('user_id').inTable('user');
      table.integer('rol_comision_id').unsigned().notNullable().references('rol_comision_id').inTable('rolcomision');
      table.unique(['group_id', 'user_id', 'rol_comision_id'], { indexName: 'uq_comision' });
    })
    // 18. studentcomision
    .createTable('studentcomision', table => {
      table.increments('estudiante_comision_id').primary();
      table.integer('group_id').unsigned().notNullable().references('group_id').inTable('groupcomision');
      table.integer('user_id').unsigned().notNullable().references('user_id').inTable('user');
      table.unique(['group_id', 'user_id'], { indexName: 'uq_studentcomision' });
    })
    // 19. revisionthesis
    .createTable('revisionthesis', table => {
      table.increments('revision_thesis_id').primary();
      table.integer('user_id').unsigned().notNullable().references('user_id').inTable('user');
      table.integer('sede_id').unsigned().notNullable().references('sede_id').inTable('sede');
      table.boolean('active_process').notNullable().defaultTo(true);
      table.datetime('date_revision').nullable().defaultTo(knex.fn.now());
      table.string('approval_letter_dir', 500).nullable();
      table.string('thesis_dir', 500).nullable();
    })
    // 20. assignedreview
    .createTable('assignedreview', table => {
      table.increments('assigned_review_id').primary();
      table.integer('revision_thesis_id').unsigned().notNullable().references('revision_thesis_id').inTable('revisionthesis');
      table.integer('user_id').unsigned().notNullable().references('user_id').inTable('user');
      table.datetime('date_assigned').notNullable().defaultTo(knex.fn.now());
      table.unique(['revision_thesis_id', 'user_id'], { indexName: 'uq_assignedreview' });
    })
    // 21. approvalthesis
    .createTable('approvalthesis', table => {
      table.increments('approval_id').primary();
      table.integer('revision_thesis_id').unsigned().notNullable().references('revision_thesis_id').inTable('revisionthesis');
      table.integer('user_id').unsigned().notNullable().references('user_id').inTable('user');
      table.datetime('date_approved').nullable();
      table.enum('status', ['pending', 'approved', 'rejected', 'in revision']).notNullable().defaultTo('pending');
    })
    // 22. commentsrevision
    .createTable('commentsrevision', table => {
      table.increments('commentsRevision_id').primary();
      table.integer('assigned_review_id').unsigned().notNullable().references('assigned_review_id').inTable('assignedreview');
      table.string('title', 150).notNullable();
      table.text('comment').notNullable();
      table.datetime('date_comment').notNullable().defaultTo(knex.fn.now());
    })
    // 23. notification
    .createTable('notification', table => {
      table.increments('notification_id').primary();
      table.text('notification_text').notNullable();
      table.integer('student_id').unsigned().notNullable().references('user_id').inTable('user');
      table.integer('task_id').unsigned().notNullable().references('task_id').inTable('task');
      table.datetime('notification_date').notNullable().defaultTo(knex.fn.now());
      table.enum('type_notification', ['student', 'general']).notNullable();
    })
    // 24. applog
    .createTable('applog', table => {
      table.increments('log_id').primary();
      table.integer('user_id').unsigned().notNullable().references('user_id').inTable('user');
      table.integer('sede_id').unsigned().nullable().references('sede_id').inTable('sede');
      table.string('action', 255).notNullable();
      table.text('details').notNullable();
      table.datetime('date').notNullable().defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('applog')
    .dropTableIfExists('notification')
    .dropTableIfExists('commentsrevision')
    .dropTableIfExists('approvalthesis')
    .dropTableIfExists('assignedreview')
    .dropTableIfExists('revisionthesis')
    .dropTableIfExists('studentcomision')
    .dropTableIfExists('comisiones')
    .dropTableIfExists('groupcomision')
    .dropTableIfExists('thesissubmissions')
    .dropTableIfExists('tasksubmissions')
    .dropTableIfExists('commentversion')
    .dropTableIfExists('comments')
    .dropTableIfExists('timelineeventos')
    .dropTableIfExists('task')
    .dropTableIfExists('courseassignment')
    .dropTableIfExists('coursesedeassignment')
    .dropTableIfExists('user')
    .dropTableIfExists('rolcomision')
    .dropTableIfExists('typetask')
    .dropTableIfExists('course')
    .dropTableIfExists('sede')
    .dropTableIfExists('year')
    .dropTableIfExists('roles');
};
