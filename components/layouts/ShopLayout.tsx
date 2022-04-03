import Head from "next/head";
import { FC } from "react";
import { Navbar, SideMenu } from "../ui";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const ShopLayout: FC<Props> = (props) => {
  const { children, title, pageDescription, imageFullUrl } = props;
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="org:description" content={pageDescription} />

        {imageFullUrl && <meta name="org:image" content={imageFullUrl} />}
      </Head>

      <nav>
        {/* NavBar */}

        <Navbar />
      </nav>

      {/* Sidebar */}

      <SideMenu />

      <main
        style={{ margin: "80px auto", maxWidth: "1440px", padding: "0px 30px" }}
      >
        {children}
      </main>

      <footer>{/* footer  */}</footer>
    </>
  );
};
