/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "portfolio",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile:
            input.stage === "production" ? "uchuu-production" : "uchuu-dev",
          region: "eu-north-1",
        },
        cloudflare: {},
      },
    };
  },
  console: {
    autodeploy: {
      target(event) {
        if (
          event.type === "branch" &&
          event.branch === "main" &&
          event.action === "pushed"
        ) {
          return {
            stage: "production",
          };
        }
      },
    },
  },
  async run() {
    const LastFmApiKey = new sst.Secret("LastFmApiKey");

    new sst.aws.SolidStart("PortfolioApp", {
      domain: {
        name: "tomo.uchuu.io",
        dns: sst.cloudflare.dns(),
      },
      link: [LastFmApiKey],
    });
  },
});
