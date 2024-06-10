# Send Google Chat Notification

This Node.js project provides a way to send notifications to Google Chat using a webhook URL. This can be particularly useful for integrating with CI/CD pipelines or other automated systems.

## Inputs

- **webhook-url**: The Google Chat webhook URL (required).
- **creator-name**: The creator of the message (required).
- **asset-url**: The URL to download the asset (optional).
- **title**: The title of the notification (optional, default: 'Notification').
- **subtitle**: The subtitle of the notification (optional, default: 'Notification').
- **job-status**: The status of the job (optional).
- **commit-id**: The commit ID (optional, if not provided will be fetched automatically).
- **description**: The description of the notification (optional).

## Usage

### Step 1: Set up Google Chat Webhook

1. Open Google Chat.
2. Select or create a room to which you want to send notifications.
3. Click the room name at the top and select "Manage webhooks".
4. Click "Add webhook" and give it a name.
5. Copy the webhook URL.

### Step 2: Configure the Notification

Ensure you have the necessary inputs to send the notification. Only the `webhook-url` and `creator-name` are required. Optional fields can be omitted, and their components will be hidden in the notification except for `commit-id`, which will be fetched automatically if not provided.

### Step 3: Install Dependencies

Ensure you have Node.js installed on your system. Then install the required dependencies: npm install

### Step 4: Building the project

If any changes are made to the code, build the project using the following command:
npm run build