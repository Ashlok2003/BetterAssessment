const TOKEN = process.argv.slice(2)[0];
const ENVIRONMENT_ID = "8f2a3400-cc06-49c1-9d17-35e99b614bec";
const SERVICE_ID = "91da767e-ed2f-475a-b4fe-be74612659c5";

const resp = await fetch('https://backboard.railway.app/graphql/v2', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${TOKEN}`,
  },
  body: JSON.stringify({
    query: `
      mutation ServiceInstanceRedeploy {
        serviceInstanceRedeploy(
          environmentId: "${ENVIRONMENT_ID}"
          serviceId: "${SERVICE_ID}"
        )
      }`
  }),
});

const data = await resp.json();

if (data.errors) {
  console.error(data.errors);
  throw new Error('Failed to redeploy service');
}

console.log('Railway deployment triggered successfully:', data);
