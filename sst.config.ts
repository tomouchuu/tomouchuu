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

        if (event.type === "pull_request") {
          return { stage: `pr-${event.number}` };
        }
      },
    },
  },
  async run() {
    const LastFmApiKey = new sst.Secret("LastFmApiKey");

    let domain = "tomo.uchuu.io";
    if ($app.stage !== "production") domain = `${$app.stage}.tomo.uchuu.io`;

    new sst.aws.SolidStart("PortfolioApp", {
      environment: {
        APP_STAGE: $app.stage,
      },
      domain: {
        name: domain,
        dns: sst.cloudflare.dns(),
      },
      link: [LastFmApiKey],
    });
  },
});
