const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const webhookUrl = core.getInput('webhook-url');
    const creator = core.getInput('creator');
    const apkUrl = core.getInput('apk-url');
    const title = core.getInput('title');
    const iconUrl = core.getInput('icon-url');
    const body = core.getInput('body');
    const jobStatus = core.getInput('job-status');
    const commitId = core.getInput('commit-id');

    const payload = {
      cards: [
        {
          header: {
            title: title,
          },
          sections: [
            creator && {
              widgets: [
                {
                  keyValue: {
                    topLabel: "Creator",
                    content: creator
                  }
                }
              ]
            },
            body && {
              widgets: [
                {
                  keyValue: {
                    topLabel: "Body",
                    content: body
                  }
                }
              ]
            },
            jobStatus && {
              widgets: [
                {
                  keyValue: {
                    topLabel: "Job Status",
                    content: jobStatus
                  }
                }
              ]
            },
            commitId && {
              widgets: [
                {
                  keyValue: {
                    topLabel: "Commit ID",
                    content: commitId
                  }
                }
              ]
            },
            apkUrl && {
              buttons: [
                {
                  textButton: {
                    text: "Download APK",
                    onClick: {
                      openLink: {
                        url: apkUrl
                      }
                    }
                  }
                }
              ]
            }
          ]
            .filter(Boolean)
        }
      ]
    };

    await axios.post(webhookUrl, payload);
    core.info('Notification sent successfully.');
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
