import { Header } from "../elements/header";
import { SectionItem, Sections } from "../elements/section";
import { Paragraph } from "../elements/paragraph";
import { ButtonList } from "../elements/button-list";
import { Button } from "../elements/button";
import { DecoratedText } from "../elements/decorated-text";
import { GithubContext } from "./github/github-context";

const branchIconUrl =
  "https://raw.githubusercontent.com/xseededucation/action_assets/master/git-branch-128.png";

export class ConstructCard {
  inputJson: Record<string, any>;
  githubContext: GithubContext;

  constructor(inputJson: Record<string, any>) {
    this.inputJson = inputJson;
    this.githubContext = new GithubContext();
  }

  get() {
    return {
      ...this.header(),
      ...this.getBodySections(),
    };
  }

  getBodySections(): Record<string, any> {
    let sections: Sections = new Sections([]);

    if (this.inputJson.body) {
      let paragraph = new Paragraph(this.inputJson.body);
      sections.addSectionItem(new SectionItem("", false, 0, [paragraph]));
    }

    sections.addSectionItem(
      new SectionItem("Creator", true, 1, [
        new Paragraph(
          this.inputJson.creator_name || this.githubContext.actor()
        ),
      ])
    );

    let commitUrl: String = "";
    if (GithubContext.isGithubEnv) {
      commitUrl = `https://github.com/${this.githubContext.owner()}/${this.githubContext.repo()}/commit/${this.githubContext.sha()}`;
    } else {
      commitUrl = "https://xseededucation.com";
    }
    sections.addSectionItem(
      new SectionItem("Commit Id", true, 1, [
        new Paragraph(
          `<a href=${commitUrl}>${
            this.inputJson.commit_id || this.githubContext.sha()
          }</a>`
        ),
      ])
    );

    let branchUrl = "";
    if (GithubContext.isGithubEnv) {
      branchUrl = `https://github.com/${this.githubContext.owner()}/${this.githubContext.repo()}/tree/${this.githubContext.ref()}`;
    } else {
      branchUrl = "https://xseededucation.com";
    }
    sections.addSectionItem(
      new SectionItem("Branch", true, 1, [
        new DecoratedText(
          `<a href=${branchUrl}>${this.githubContext.ref()}</a>`,
          {
            startIcon: {
              iconUrl: branchIconUrl,
            },
          }
        ),
      ])
    );
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
    sections.addSectionItem(new SectionItem("", false, 0, [buttonList]));

    return sections.json();
  }

  header(): Record<string, any> {
    return new Header(
      this.inputJson.header.title || this.githubContext.repo(),
      this.inputJson.header.subtitle || "",
      "https://raw.githubusercontent.com/xseededucation/action_assets/master/29.webp",
      "CIRCLE"
    ).json();
  }
}
