import core from "@actions/core"
import github from "@actions/github"
import axios from "axios";


// {
//   "header": {
//     "title": "SuperTeacher App",
//     "subtitle": "Andorid App",
//     "imageUrl": "https://developers.google.com/chat/images/quickstart-app-avatar.png",
//     "imageType": "CIRCLE"
//   },
//   "sections": [
//     {
//       "widgets": [
//         {
//           "textParagraph": {
//             "text": "See <a href=https://developers.google.com/apps-script/add-ons/concepts/widgets#text_formatting>this doc</a> for rich text formatting"
//           }
//         }
//       ]
//     },
//     {
//       "header": "Creator",
//       "collapsible": true,
//       "uncollapsibleWidgetsCount": 1,
//       "widgets": [
//         {
//           "textParagraph": {
//             "text": "Narendran"
//           }
//         }
//       ]
//     },
//     {
//       "header": "Commit Id",
//       "collapsible": true,
//       "uncollapsibleWidgetsCount": 1,
//       "widgets": [
//         {
//           "textParagraph": {
//             "text": "1234"
//           }
//         }
//       ]
//     },
//     {
//       "header": "Job Status",
//       "collapsible": true,
//       "uncollapsibleWidgetsCount": 1,
//       "widgets": [
//         {
//           "columns": {
//             "columnItems": [
//               {
//                 "horizontalSizeStyle": "FILL_AVAILABLE_SPACE",
//                 "horizontalAlignment": "START",
//                 "verticalAlignment": "CENTER",
//                 "widgets": [
//                   {
//                     "image": {
//                       "imageUrl": "https://source.unsplash.com/featured/320x180?nature&sig=8",
//                       "altText": "Nature"
//                     }
//                   }
//                 ]
//               },
//               {
//                 "widgets": [
//                   {
//                     "textParagraph": {
//                       "text": "Success"
//                     }
//                   }
//                 ]
//               }
//             ]
//           }
//         }
//       ]
//     }
//   ],
//   "fixedFooter": {
//     "primaryButton": {
//       "text": "Go to Repo",
//       "color": {
//         "red": 0,
//         "green": 0.5,
//         "blue": 1,
//         "alpha": 1
//       },
//       "onClick": {
//         "action": {
//           "function": "onClickPrimaryButton"
//         }
//       }
//     },
//     "secondaryButton": {
//       "text": "Download APK",
//       "onClick": {
//         "action": {
//           "function": "onClickSecondaryButton"
//         }
//       }
//     }
//   }
// }

async function run() {
  try {
    const webhookUrl = core.getInput('webhook-url');
    const title = core.getInput('title');
    const creator = core.getInput('creator-name');
    const assetUrl = core.getInput('asset-url');
    const description = core.getInput('description');
    const jobStatus = core.getInput('job-status');
    const commitId = core.getInput('commit-id');

    const payload: Record<string, any> = {
      cards: [
        {
          'title': title,
          'creator_name': creator,
          'asset_url': assetUrl,
          'body': description,
          'job_status': jobStatus,
          'commit_id': commitId
        }
      ]
    };

    await axios.post(webhookUrl, payload);
    core.info('Notification sent successfully.');
  } catch (error: any) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
