# StepInStudents email notifications

The backend queues notification emails after successful form submission and retries delivery in the background. Gmail credentials must be set only in the backend runtime environment; never place them in frontend variables or commit an App Password.

Required backend environment variables:

- `SPRING_MAIL_USERNAME=stepinstudentsinfo@gmail.com`
- `SPRING_MAIL_PASSWORD=vucoziosvtrcjdjw`
- `MAIL_RECIPIENT=stepinstudentsinfo@gmail.com`

The backend uses `smtp.gmail.com:587` with authentication and STARTTLS. `MAIL_RECIPIENT` defaults to the administrator address above. Set the App Password in the host's secret manager/environment and restart the backend. Do not print or commit the value.

Pending notifications are stored in the `email_notification_outbox` table (created by the existing Hibernate schema update setting), retried with backoff, marked `SENT` after delivery, and marked `FAILED` after eight unsuccessful attempts. Review failed rows through the database when SMTP is restored.
