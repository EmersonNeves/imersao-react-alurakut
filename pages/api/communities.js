import { SiteClient } from "datocms-client";

export default async function requestReceiver(request, response) {
  if (request.method === "POST") {
    const TOKEN = "b8f16762f7990c10e3bc6eff4db0ed";
    const client = new SiteClient(TOKEN);

    const record = await client.items.create({
      itemType: "977048",
      ...request.body
    });

    response.json({
      dados: "Algum dado",
      record: record,
    });
  }
}
