import { Header } from "../elements/header";
import { SectionItem, Sections } from "../elements/section";
import { Paragraph } from "../elements/paragraph";
import { ButtonList } from "../elements/button-list";
import { Button } from "../elements/button";
import { DecoratedText } from "../elements/decorated-text";
import { GithubContext } from "./github/github-context";
import {
  statusColor,
  StatusColorKey,
  statusImage,
  StatusImageKey,
  statusMessage,
  StatusMessageKey,
} from "./success-indication";
import * as core from "@actions/core";
import { BodyConstructor } from "./body-helpers/BodyConstructor";


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
    return new BodyConstructor(this.inputJson, this.githubContext).process();
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
