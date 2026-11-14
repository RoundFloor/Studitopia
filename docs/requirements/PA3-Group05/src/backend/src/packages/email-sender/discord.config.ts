export async function sendOTP(webhookURL: string, email: string, otp: string) {
  const response = await fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: "Verification",
      embeds: [
        {
          title: "Email Verification",
          color: 5793266,
          fields: [
            {
              name: email,
              value: "```" + otp + "```",
              inline: false
            },
            {
              name: "Expiration",
              value: "1 minutes",
              inline: true
            }
          ],
          footer: {
            text: "Automated Verification System"
          },
          timestamp: new Date().toISOString()
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Discord API Error: ${response.status}`);
  }

  return {
    success: true
  };
}