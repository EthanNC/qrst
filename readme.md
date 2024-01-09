# QRST Stack

This is my starter kit for the QRST Stack. It contains

- Q, [Tanstack-Query](https://tanstack.com/query/latest)
- R, [Tanstack-Router](https://tanstack.com/router)
- S, [SST](https://sst.dev/)
- T, [tRPC](https://trpc.io/)

## Quick Start

### Prerequisites

- [pnpm](https://pnpm.io/)
- [Node.js](https://nodejs.org/en/) >= 18.0.0
- [SST](https://sst.dev/)

Clone the repo and install dependencies

```bash
pnpm install
```

Start SST (Assuming you have [AWS credentials via the cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) set up). Starting SST will create a CloudFormation stack and deploy the API Gateway serving the Lambda functions.

```bash
pnpm dev
```

Finally start the React app

```bash
cd packages/web
pnpm dev
```
