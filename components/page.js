import Head from 'next/head'

export default ({ children, title = 'Trail Watch', description = '' }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="manifest" href="/manifest.json" />
      <title>{title + ' | Trail Watch'}</title>
    </Head>
    <div>{children}</div>
  </>
)
