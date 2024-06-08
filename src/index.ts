import * as core from "@actions/core";
import axios from "axios";
import { ConstructCard } from "./helpers/construct-card";

async function run() {
  try {
    const webhookUrl = core.getInput("webhook-url");
    const title = core.getInput("title");
    const creator = core.getInput("creator-name");
    const assetUrl = core.getInput("asset-url");
    const description = core.getInput("description");
    const jobStatus = core.getInput("job-status");
    const commitId = core.getInput("commit-id");

    const payload: Record<string, any> = {
      cardsV2: [
        {
          card: {
            ...new ConstructCard({
              header: {
                title: title || "NA",
                subtitle: "NA",
              },
              creator_name: creator || "NA",
              asset_url: assetUrl || "NA",
              body: description || "NA",
              job_status: jobStatus || "NA",
              commit_id: commitId,
            }).get(),
          },
        },
      ],
    };

    console.log(JSON.stringify(payload));
    // await axios.post(webhookUrl, payload);
    core.info("Notification sent successfully.");
  } catch (error: any) {
    core.setFailed(`Action failed with error: ${error}`);
  }
}

run();
