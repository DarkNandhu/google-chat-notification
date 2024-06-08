import * as core from '@actions/core';
import axios from "axios";
import { ConstructCard } from "./helpers/construct-card";


async function run() {
  try {

    const webhookUrl = core.getInput('webhook-url');
    const title =  'NA';
    const creator = core.getInput('creator-name');
    const assetUrl = core.getInput('asset-url');
    const description = core.getInput('description');
    const jobStatus = core.getInput('job-status');
    const commitId = core.getInput('commit-id');

    const payload: Record<string, any> = {
      cards: [
        new ConstructCard(
          {
            'title': title,
            'creator_name': creator,
            'asset_url': assetUrl,
            'body': description,
            'job_status': jobStatus,
            'commit_id': commitId
          }
        ).get()
      ]
    };

    await axios.post(webhookUrl, payload);
    core.info('Notification sent successfully.');
  } catch (error: any) {
    core.setFailed(`Action failed with error: ${error}`);
  }
}

run();
