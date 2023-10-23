import styles from '../styles/Home.module.css';
import Head from "next/head";
import { useState } from 'react';

// フォーム入力データの型
type formData = {
  company: string;
  name: string;
  email: string;
  type: string;
  message: string;
};

type functionReponse = {
  delivery_id?: number;
};

export default function IndexPage() {
  // フォームの初期値
  const defaultValue: formData = {
    company: '',
    name: '',
    email: '',
    type: '',
    message: '',
  };

  const options: string[] = ['会社について', 'サービスについて', 'その他'];
  const [form, setForm] = useState(defaultValue);

  // フォームの送信処理
  const send = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/blastengine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const json = await res.json() as functionReponse;
    if (json.delivery_id) {
      alert('送信しました');
      setForm(defaultValue);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>お問い合わせ</title>
        </Head>

        <main className={styles.main}>
          <h3 className={styles.title}>お問い合わせ</h3>
          <form className="container" onSubmit={send}>
            <div className="company block">
              <label htmlFor="frm-company">会社名</label>
              <input
                id="frm-company"
                type="text"
                value={form.company}
                autoComplete="company"
                onChange={(e) =>
                  setForm({ ...form, ...{ company: e.target.value } })
                }
                required
              />
            </div>
            <div className="account block">
              <label htmlFor="frm-name">名前</label>
              <input
                id="frm-name"
                type="text"
                value={form.name}
                autoComplete="name"
                onChange={(e) =>
                  setForm({ ...form, ...{ name: e.target.value } })
                }
                required
              />
            </div>
            <div className="email block">
              <label htmlFor="frm-email">メールアドレス</label>
              <input
                id="frm-email"
                type="email"
                value={form.email}
                autoComplete="email"
                onChange={(e) =>
                  setForm({ ...form, ...{ email: e.target.value } })
                }
                required
              />
            </div>
            <div className="block type">
              <label htmlFor="frm-type">お問い合わせ種別</label>
              <select
                onChange={(e) =>
                  setForm({ ...form, ...{ type: e.target.value } })
                }
              >
                {options.map((option) => (
                  <option value={option} key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="message block">
              <label htmlFor="frm-message">Message</label>
              <textarea
                id="frm-message"
                rows={6}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, ...{ message: e.target.value } })
                }
              >
              </textarea>
            </div>
            <button onClick={send}>送信</button>
          </form>
        </main>
      </div>
    </>
  );
}
