import { Header } from "../elements/header";
import * as github from "@actions/github";
import { SectionItem, Sections } from "../elements/section";
import { Paragraph } from "../elements/paragraph";
import { FixedFooter, FooterButton } from "../elements/fixed-footer";
import { ButtonList } from "../elements/button-list";
import { Button } from "../elements/button";

export class ConstructCard {
  inputJson: Record<string, any>;

  constructor(inputJson: Record<string, any>) {
    this.inputJson = inputJson;
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
        new Paragraph(this.inputJson.creator_name || github.context.actor),
      ])
    );

    sections.addSectionItem(
      new SectionItem("Commit Id", true, 1, [
        new Paragraph(this.inputJson.commit_id || github.context.sha),
      ])
    );

    sections.addSectionItem(
      new SectionItem("", false, 0, [
        new ButtonList([
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
                url: `https://github.com/${github.context.repo.owner}/${github.context.repo.repo}`,
              },
            }
          ),
        ]),
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
