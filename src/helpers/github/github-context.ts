import * as github from "@actions/github";

export class GithubContext {
  static get isGithubEnv(): boolean {
    return process.env.GITHUB_ACTIONS === "true";
  }

  githubContext: typeof github.context;
  constructor() {
    this.githubContext = github.context;
  }

  status(): string {
    if(GithubContext.isGithubEnv) {
      return this.githubContext.job
    }
    return "success"
  }

   actor(): string {
    if(GithubContext.isGithubEnv) {
      return this.githubContext.actor
    }
    return "demo_user"
   }
   sha(): string {
    if(GithubContext.isGithubEnv) {
      return this.githubContext.sha
    }
    return "12345"
   }
   ref(): string {
    if(GithubContext.isGithubEnv) {
      return this.githubContext.ref
    }
    return "hello/world"
   }
   owner(): string {
    if(GithubContext.isGithubEnv) {
      return this.githubContext.repo.owner
    }
    return "owner"
   }
   repo(): string {
    if(GithubContext.isGithubEnv) {
      return this.githubContext.repo.repo
    }
    return "repo"
   }
}
