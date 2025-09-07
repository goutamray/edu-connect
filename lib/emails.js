import { Resend } from "resend";
import EmailTemplate from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (emailInfo) => {
  if (!emailInfo) {
    return null;
  }

  const response = await Promise.allSettled(
    emailInfo.map(async (data) => {
      const to = data.to;
      const subject = data.subject;
      const message = data.message;

      if (data.to && data.subject && data.message) {
        const sendInfo = await resend.emails.send({
          from: "noreplay.goutam.com",
          to: to,
          subject: subject,
          react: EmailTemplate({ message }),
        });

        return sendInfo;
      } else {
        const rejectedPromise = new Promise((reject) => {
          return reject(
            new Error(`Couldnot send email  ${JSON.stringify(data)} `)
          );
        });

        return rejectedPromise;
      }
    })
  );

  return response;
};
