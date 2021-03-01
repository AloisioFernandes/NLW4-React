import Document, { Html, Head, Main, NextScript } from 'next/document'
// Next.js colocará tudo dentro de Head no head da página HTML gerada, Main é a aplicação e NextScript são scripts automátiocs do Next
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
} 