import { Button } from "../../elements/button";
import { ButtonList } from "../../elements/button-list";
import { DecoratedText } from "../../elements/decorated-text";
import { Paragraph } from "../../elements/paragraph";
import { SectionItem, Sections } from "../../elements/section";
import { GithubContext } from "../github/github-context";
import {
  statusColor,
  StatusColorKey,
  statusImage,
  StatusImageKey,
  statusMessage,
  StatusMessageKey,
} from "../success-indication";

const branchIconUrl =
  "https://raw.githubusercontent.com/xseededucation/action_assets/master/git-branch-128.png";

export class BodyConstructor {
  inputJson: Record<string, any>;
  githubContext: GithubContext;

  private sections: Sections = new Sections([]);

  constructor(inputJson: Record<string, any>, githubContext: GithubContext) {
    this.inputJson = inputJson;
    this.githubContext = githubContext;
  }

  process(): Record<string, any> {
    this.addJobStatus();
    this.addBody();
    this.addCreator();
    this.addCommitSection();
    this.addBranchInfo();

    return this.sections.json();
  }

  private addButtons(): void {
    const buttonList = new ButtonList([
      new Button(
        "Open Repo",
        {
          red: 0.5,
          green: 0,
          blue: 1,
          alpha: 1,
        },
        {
          openLink: {
            url: `https://github.com/${this.githubContext.owner()}/${this.githubContext.repo()}`,
          },
        }
      ),
    ]);

    if (this.inputJson.asset_url) {
      buttonList.addButton(
        new Button(
          "Download APK",
          {
            red: 0,
            green: 0.5,
            blue: 0,
            alpha: 1,
          },
          {
            openLink: {
              url: this.inputJson.asset_url,
            },
          }
        )
      );
    }
    this.sections.addSectionItem(new SectionItem("", false, 0, [buttonList]));
  }
  private addBranchInfo(): void {
    let branchUrl = "";
    if (GithubContext.isGithubEnv) {
      branchUrl = `https://github.com/${this.githubContext.owner()}/${this.githubContext.repo()}/tree/${this.githubContext.ref()}`;
    } else {
      branchUrl = "https://xseededucation.com";
    }
    this.sections.addSectionItem(
      new SectionItem("Branch", true, 1, [
        new DecoratedText(
          `<a style="text-decoration: none; color: red;" href=${branchUrl}>${this.githubContext.ref().substring(0, 7)}</a>`,
          {
            startIcon: {
              iconUrl: branchIconUrl,
            },
          }
        ),
      ])
    );
  }

  private addCommitSection(): void {
    let commitUrl: String = "";
    if (GithubContext.isGithubEnv) {
      commitUrl = `https://github.com/${this.githubContext.owner()}/${this.githubContext.repo()}/commit/${this.githubContext.sha()}`;
    } else {
      commitUrl = "https://xseededucation.com";
    }
    this.sections.addSectionItem(
      new SectionItem("Commit Id", true, 1, [
        new Paragraph(
          `<a style="text-decoration: none; color: red;" href=${commitUrl}>${
            this.inputJson.commit_id || this.githubContext.sha()
          }</a>`
        ),
      ])
    );
  }

  private addCreator(): void {
    this.sections.addSectionItem(
      new SectionItem("Creator", true, 1, [
        new Paragraph(
          this.inputJson.creator_name || this.githubContext.actor()
        ),
      ])
    );
  }

  private addBody(): void {
    if (this.inputJson.body) {
      let paragraph = new Paragraph(this.inputJson.body);
      this.sections.addSectionItem(
        new SectionItem("Description", false, 0, [paragraph])
      );
    }
  }

  private addJobStatus(): void {
    if (this.inputJson.job_status) {
      const jobStatus: string = this.inputJson.job_status;
      let decoratedText = new DecoratedText(
        `<font color="${statusColor[jobStatus as StatusColorKey]}">${
          statusMessage[jobStatus as StatusMessageKey]
        }</font>`,
        {
          startIcon: {
            iconUrl: statusImage[jobStatus as StatusImageKey],
          },
        }
      );
      this.sections.addSectionItem(
        new SectionItem("Status", false, 0, [decoratedText])
      );
    }
  }
}
