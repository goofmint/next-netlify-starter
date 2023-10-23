import type { NextApiRequest, NextApiResponse } from 'next'
import { BlastEngine, Mail } from 'blastengine';

type Data = {
  delivery_id: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
  new BlastEngine(process.env.BLASTENGINE_USER_ID!, process.env.BLASTENGINE_API_KEY!);
  const { body } = req;
  const mail = new Mail();
  const text = `__USERNAME__様

お問い合わせいただきありがとうございます。内容を確認し、追ってご連絡いたします。

会社名：
__COMPANY__
お名前：
__USERNAME__
お問い合わせ内容：
__MESSAGE__
`;
  mail
    .setFrom('info@opendata.jp', '管理者')
    .setSubject('お問い合わせありがとうございます')
    .addTo(body.email, { USERNAME: body.name, COMPANY: body.company, MESSAGE: body.message })
    .setText(text)
    .setEncode('UTF-8');
  await mail.send();
  res.status(200).json({ delivery_id: mail.deliveryId! });
}