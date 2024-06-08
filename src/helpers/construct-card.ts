import { Header } from "../elements/header";
import * as github from "@actions/github";
import { SectionItem, Sections } from "../elements/section";
import { Paragraph } from "../elements/paragraph";
import { FixedFooter, PrimaryButton, SecondaryButton } from "../elements/fixed-footer";

export class ConstructCard {
  inputJson: Record<string, any>;

  constructor(inputJson: Record<string, any>) {
    this.inputJson = inputJson;
  }

  get() {
    return {
      ...this.header(),
      ...this.getBodySections(),
      ...this.getFooter(),
    };
  }

  getFooter(): Record<string, any> {
    const repoPath = `${github.context.repo.owner}/${github.context.repo.repo}`
    return new FixedFooter(
      new PrimaryButton(
        "Go to repo",
        {
          "red": 0,
          "green": 0.5,
          "blue": 1,
          "alpha": 1
        },
        {
          openLink: {
            url: `https://github.com/${repoPath}`
          }
        }
      ),
      new SecondaryButton(
        "Download APK",
         {
          "red": 0,
          "green": 0.5,
          "blue": 0,
          "alpha": 1,
        },
        {
          openLink: {
            url: this.inputJson.asset_url
          }
        }
      )
    ).json()
  }

  getBodySections(): Record<string, any> {
    let sections: Sections = new Sections([]);

    if (this.inputJson.body) {
      let paragraph = new Paragraph(this.inputJson.body);
      sections.addSectionItem(new SectionItem("", false, 0, [paragraph]));
    }

    sections.addSectionItem(
      new SectionItem("Creator", true, 1, [
        new Paragraph(this.inputJson.creator_name || github.context.actor),
      ])
    );

    sections.addSectionItem(
      new SectionItem("Commit Id", true, 1, [
        new Paragraph(this.inputJson.commit_id || github.context.sha),
      ])
    );

    return sections.json();
  }

  header(): Record<string, any> {
    return new Header(
      this.inputJson.header.title || github.context.repo.repo,
      this.inputJson.header.subtitle || "",
      "https://developers.google.com/chat/images/quickstart-app-avatar.png",
      "CIRCLE"
    ).json();
  }
}
