import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Container, Header, Footer } from '../components/Layout';

export default function Home({ items }) {
  return (
    <Fragment>
      <Head>
        <title>CtR</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header />
        <main>
          <section className="py-24 text-center space-y-6">
            <h1 className="text-8xl font-bold">Cover the Remix</h1>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
              The Non-Fungible Token (NFT) marketplace for remix and cover artists built on the{' '}
              <a className="underline" href="https://zora.engineering" target="_blank" rel="noreferrer">
                Zora
              </a>{' '}
              protocol using{' '}
              <a className="underline" href="https://nextjs.org" target="_blank" rel="noreferrer">
                NFT.Storage
              </a>
              ,{' '}
              <a className="underline" href="https://thegraph.com" target="_blank" rel="noreferrer">
                Polygon
              </a>{' '}
              and{' '}
              <a className="underline" href="https://tailwindcss.com" target="_blank" rel="noreferrer">
                Lit Protocol
              </a>
              .
            </p>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {items.map((item, idx) => (
              <Link key={idx} href={`/item/${encodeURIComponent(item.id)}`}>
                <a className="block hover:text-blue-500">
                  <figure className="space-y-4">
                    <img className="block w-full" src={item.contentURI} alt={item.name} />
                    <figcaption className="stack-y-1">
                      <div className="font-semibold text-xl">{item.name}</div>
                      <div className="text-gray-400">{item.currentBids.length} bids</div>
                    </figcaption>
                  </figure>
                </a>
              </Link>
            ))}
          </section>
        </main>
        <Footer />
      </Container>
    </Fragment>
  );
}

export async function getServerSideProps() {
  const items = await fetchMediaItems();
  return { props: { items } };
}

async function fetchMediaItems() {
  // // Fetch the data from The Graph
  // const request = await fetch(process.env.ZORA_SUB_GRAPH_API_URL, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     query: `query getMediaItems($first: Int!, $creator: String!) {
  //         medias(
  //           orderBy: createdAtTimestamp, 
  //           orderDirection: desc,
  //           first: $first, 
  //           where: { creator: $creator }
  //         ) {
  //           id
  //           contentURI
  //           metadataURI
  //           currentBids { id }
  //         }
  //       }`,
  //     variables: {
  //       first: 6,
  //       creator: process.env.NEXT_PUBLIC_CREATOR_ADDRESS,
  //     },
  //   }),
  // });
  // const json = await request.json();
  // const { medias } = json.data;

  // // Fetch the contents of the metadata
  // const items = await Promise.all(
  //   medias.map(async media => {
  //     try {
  //       const request = await fetch(media.metadataURI);
  //       const metadata = await request.json();
  //       return { ...media, ...metadata };
  //     } catch {
  //       return media;
  //     }
  //   })
  // );

  return items;
}
